import useAuth from "@/composables/useAuth";

const notification = useNotification();

export default function useApi<T>(url: string, baseOptions: any = {}) {
    url = url.replace("/api/v1", "");
    const { $i18n } = useNuxtApp();
    const t = $i18n.t.bind($i18n);
    const locale = $i18n.locale.value;
    const config = useRuntimeConfig();
    const { getAccessToken, refreshAccessToken } = useAuth();
    const router = useRouter();

    const accessToken = getAccessToken();
    const headers: Record<string, string> = {
        ...(baseOptions.headers || {}),
        "accept-language": locale || "uz",
    };


    const ignoreList = ["/auth", "/auth/refresh"];

    const fetchOptions = {
        baseURL: config.public.NUXT_PUBLIC_API_BASE_URL,
        watch: false,
        ...baseOptions,
        headers: {
            ...baseOptions.headers,
            ...headers,
            Authorization: `Bearer ${accessToken}`
        },
        key: new Date().toISOString(),
        transform: (
            response: T extends void ? unknown : T
        ): T extends void ? unknown : T =>
            (response && typeof response === "object" && "data" in response
                ? response
                : response) as T extends void ? unknown : T,
        onResponseError: async ({
                                    response,
                                    options,
                                }: {
            response: any;
            options: any;
        }) => {
            if (response.status === 401 && !ignoreList.includes(url)) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    const newAccessToken = getAccessToken();
                    options.headers = {
                        ...baseOptions.headers,
                        ...headers,
                        ...options.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    };
                    return await useApi<T>(url, options);
                } else {
                    router.push("/auth");
                }
            }
        },
        onResponse: async ({
                               response,
                               options,
                           }: {
            response: any;
            options: any;
        }) => {
            const message =
                response?._data?.message ?? t("action.dataSuccessfullyUpdated");
            const isSuccess = response?.status === 200 || false;

            if (
                isSuccess &&
                !ignoreList.includes(url) &&
                (options.method === "POST" ||
                    options.method === "PUT" ||
                    options.method === "PATCH" ||
                    options.method === "DELETE") &&
                (response.status === 201 || response.status === 200)
            ) {
                notification.success({
                    title: t("action.success"),
                    content: message,
                    duration: 3000,
                });
            }

            if (response.status === 400 && (options.method === "POST" ||
                options.method === "PUT" ||
                options.method === "PATCH")) {
                notification.error({
                    title: t("action.error"),
                    content: message,
                    duration: 3000,
                });
            }
        },
    };
    return useFetch<T>(url, fetchOptions);
}


// #BUG composables/useApi.ts
// import type { TError } from '~/types/error'

// export default function useApi<T>(url: string, options = {}) {
//   const config = useRuntimeConfig()
//   const headers: Record<string, string> = {}
//   const mainStore = useMainStore()
//   const persistStore = usePersistStore()
//   const router = useRouter()

//   const {error_status_code_list,refresh_api,refresh_ignore_endpoint} = useConfig()

//   const access_token = localStorage.token
//   const refresh_token = localStorage.refresh
//   if (access_token) {
//     headers.Authorization = `Bearer ${access_token}`
//   }

//   async function refreshAccessToken () {
//     await $fetch(refresh_api, {
//       baseURL:config.public.apiBase,
//       method: 'POST',
//       body: { refresh: refresh_token },
//     })
//     .then((response) => {
//       localStorage.token = response?.access
//     })
//     .catch(err => {
//       if (err?.status) {
//         persistStore.$reset()
//         localStorage.clear()
//         router.push('/login')
//       }
//     })
//   }

//   return useFetch<T, TE>(url, {
//     onRequest: (ctx) => {
//       mainStore.addPendingApiPath(url)
//     },
//     onResponse: (ctx) => {
//       mainStore.removePendingApiPath(url)
//     },
//     onResponseError: (ctx) => {
//       mainStore.removePendingApiPath(url)
//       const errorStatus = ctx?.response?.status;
//       if (errorStatus === 401 && !refresh_ignore_endpoint.includes(url)) {
//         refreshAccessToken()
//       }
//       if (error_status_code_list?.includes(errorStatus)) {

//         const error: TError = ctx.response._data[0] || {}
//         mainStore.setErrorMsg(error)
//         mainStore.showError = true
//       }
//     },
//     baseURL: config.public.apiBase,
//     watch: false,
//     immediate: !['POST', 'PUT', 'PATCH', 'DELETE'].includes(options?.method),
//     headers,
//     ...options,
//   })
// }
//