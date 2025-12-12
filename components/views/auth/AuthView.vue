<template>
  <div class="flex w-full h-full p-4 bg-surface-40 rounded-2xl border border-surface-30 shadow-auth-login font-geist">
    <div class="flex-1 h-full">
      <AuthCarousel />
    </div>

    <div class="flex flex-1 items-center justify-center px-10">
      <div class="flex w-full flex-col gap-8 bg-surface-40 rounded-xl border border-surface-20 p-6 shadow-auth-login max-w-[600px]">
        <n-spin :show="loading" radius="lg" class="w-full">
          <div class="flex justify-end gap-4 align-center mb-8 w-full">
            <AppThemeSelect />
            <AppLangSelect />
          </div>

          <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-1">
              <div>
                <span class="text-primary-color font-bold text-[30px]">{{ $t('auth.login') }}</span>
              </div>
              <div>
                <span class="text-primary-300">{{ $t('auth.description') }}</span>
              </div>
            </div>

            <n-form ref="formRef" :model="form" :rules="formRules" v-if="!isUserSelectsRole">
              <n-form-item :label="$t('auth.username')" label-placement="top" path="login">
                <n-input
                    v-model:value="form.login"
                    size="medium"
                    class="w-full text-sm bg-transparent outline-none placeholder:text-primary-500 text-primary-color"
                    placeholder=" "
                >
                  <template #prefix>
                    <IconUserProfile class="w-5 h-5 text-primary-color" />
                  </template>
                </n-input>
              </n-form-item>

              <n-form-item :label="$t('auth.password')" label-placement="top" path="password">
                <n-input v-model:value="form.password" type="password" show-password size="medium" class="w-full" placeholder=" ">
                  <template #prefix>
                    <IconLockOpen class="w-5 h-5 text-primary-color" />
                  </template>
                </n-input>
              </n-form-item>

              <n-button @click.prevent="submit" block size="medium" class="mt-[22px] h-10 bg-info-100 text-white font-bold text-sm">
                {{ $t('auth.login') }}
              </n-button>
            </n-form>

            <n-form ref="selectRoleFormRef" :model="selectRoleFormData" :rules="selectRoleFormRules" v-else-if="isUserSelectsRole && !isUserHaveOneRole">
              <n-form-item :label="$t('auth.selectRole')" label-placement="top" path="accountRoleId">
                <n-select
                    v-model:value="selectRoleFormData.accountRoleId"
                    :options="roleOptions"
                    placeholder="Rolni tanlang"
                    class="w-full"
                />
              </n-form-item>

              <n-button @click.prevent="confirmRole" block size="medium" class="mt-[22px] h-10 bg-info-100 text-white font-bold text-sm">
                {{ $t('auth.login') }}
              </n-button>
            </n-form>
          </div>

          <div class="flex w-full flex-col gap-6 items-center mt-8">
            <div class="w-full flex justify-center gap-10">
              <div v-for="(project, index) in projectList" :key="index" class="flex items-center gap-2">
                <div :style="{ backgroundColor: project.bg, borderColor: project.border }" class="rounded-md border-1 py-1 px-1.5 border">
                  <IconPlatform class="text-white" />
                </div>
                <span class="text-primary-color font-semibold text-sm">{{ $t(project.name) }}</span>
              </div>
            </div>
            <div class="text-center w-full">
              <span class="text-primary-300">{{ $t('auth.projectList') }}</span>
            </div>
          </div>
        </n-spin>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from '#imports'
import Cookies from 'js-cookie'
import { createDiscreteApi } from 'naive-ui'
import type { LoginForm, selectRoleForm } from '@/types'
import type { components } from '@/api/apiMethods.types'
import { SystemType } from '@/store/main'
import { platformRoutes } from '@/constants'
type AccountRoleDto = components['schemas']['AccountRoleDto']

const { notification } = createDiscreteApi(['notification'])

const router = useRouter()

const formRef = ref()
const selectRoleFormRef = ref()

const isUserSelectsRole = ref<boolean>(false)
const isUserHaveOneRole = ref<boolean>(false)
const loading = ref<boolean>(false)

const formRules = {
  login: { required: true, message: '', trigger: ['blur', 'input'] },
  password: { required: true, message: '', trigger: ['blur', 'input'] }
}

const selectRoleFormRules = {
  accountRoleId: {
    required: true,
    message: 'Iltimos, rolni tanlang',
    trigger: ['change', 'blur'],
    validator: (rule: any, value: any) => {
      if (value === null || value === undefined) {
        return new Error('Iltimos, rolni tanlang')
      }
      return true
    }
  }
}

const userRolesList = ref<AccountRoleDto[]>([])

const projectList = [
  { name: 'platform.libraAI', bg: '#893DF3', border: '#893DF3' },
  { name: 'platform.camera', bg: '#3D89F3', border: '#99C4FF' },
  { name: 'platform.helmet', bg: '#0EC487', border: '#45F1B7' }
]

const form = reactive<LoginForm>({ login: '', password: '' })

const selectRoleFormData = reactive<selectRoleForm>({ accountRoleId: undefined as unknown as number, tempToken: '' })

const roleOptions = computed(() =>
    userRolesList.value.map(r => ({ label: r.role?.name ?? String(r.id), value: r.id }))
)

const hasPermission = (systems: number, required: SystemType) => (systems & required) === required

const getFirstAllowedRoute = (systems: number) => {
  const route = platformRoutes.find(r => hasPermission(systems, r.permission))
  return route?.route ?? '/'
}

const submit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
  } catch {
    return
  }
  loading.value = true
  const { data: anyData, error } = await useApiService().Auth.login(form)
  userRolesList.value = anyData.value?.accountRoles || []
  selectRoleFormData.tempToken = anyData.value?.tempToken || ''

  if (error.value) {
    isUserSelectsRole.value = false
    notification.error({ title: 'Error', content: error.value.data.message })
  } else {
    if ((anyData.value?.accountRoles || []).length === 1) {
      isUserHaveOneRole.value = true
      isUserSelectsRole.value = false

      const roleId = anyData.value?.accountRoles?.[0]?.id
      if (roleId == null) {
        loading.value = false
        notification.error({ title: 'Error', content: 'Invalid role id' })
      } else {
        const { data: tokens } = await useApiService().Auth.selectRole({
          accountRoleId: roleId,
          tempToken: anyData.value?.tempToken ?? ''
        })

        if (tokens.value?.access && tokens.value?.refresh) {
          Cookies.set('access_token', tokens.value?.access, { expires: 7 })
          Cookies.set('refresh_token', tokens.value?.refresh, { expires: 7 })
          Cookies.set('systems', String(tokens.value?.systems), { expires: 7 })
          const systems = tokens.value?.systems ?? 0
          const firstRoute = getFirstAllowedRoute(systems)
          await router.push(firstRoute)
        }
      }
    } else {
      isUserSelectsRole.value = true
      isUserHaveOneRole.value = false
    }
  }
  loading.value = false
}

const confirmRole = async () => {
  if (!selectRoleFormRef.value) {
    notification.error({ title: 'Error', content: "Forma tayyor emas. Iltimos, qayta urinib ko'ring." });
      return;
    }

    // Validatsiyani tekshirish
    try {
      await selectRoleFormRef.value.validate();
    } catch (err) {
      console.warn('selectRoleForm validation failed', err);
      return; // Naive UI o'zi xabar ko'rsatadi
    }

    // Qo'shimcha tekshiruv
    if (!selectRoleFormData.accountRoleId) {
      notification.error({ title: "Xato", content: "Iltimos, rolni tanlang." });
      return;
    }

    if (!selectRoleFormData.tempToken) {
      notification.error({ title: 'Xato', content: "Token mavjud emas. Iltimos, qayta kiring." });
      return;
    }

    console.log('Sending to API:', {
      accountRoleId: selectRoleFormData.accountRoleId,
      tempToken: selectRoleFormData.tempToken
    });

    loading.value = true;

    try {
      const { data: tokens, error } = await useApiService().Auth.selectRole({
        accountRoleId: selectRoleFormData.accountRoleId,
        tempToken: selectRoleFormData.tempToken
      });

      if (error?.value) {
        console.error('selectRole API error', error.value);
        notification.error({ title: 'Xato', content: error.value.data?.message ?? 'Server xatosi' });
        return;
      }

      if (tokens?.value?.access && tokens?.value?.refresh) {
        Cookies.set('access_token', tokens.value.access, { expires: 7 });
        Cookies.set('refresh_token', tokens.value.refresh, { expires: 7 });
        Cookies.set('systems', String(tokens.value.systems), { expires: 7 });
        const systems = tokens.value.systems ?? 0;
        const firstRoute = getFirstAllowedRoute(systems);
        await router.push(firstRoute);
      } else {
        notification.error({ title: 'Xato', content: 'Tokenlar olinmadi' });
      }
    } catch (err) {
      console.error('Unexpected error in confirmRole', err);
      notification.error({ title: 'Xato', content: "So'rov yuborishda xato yuz berdi" });
      } finally {
        loading.value = false;
      }
    };
</script>

<style>
.el-input__wrapper,
.el-select__wrapper {
  @apply !py-1.5 !px-2 !flex h-10 !bg-surface-50;
}

.el-input__prefix-inner {
  @apply !border-r border-surface-20 !flex !justify-center !items-center;
}

.el-input__icon {
  @apply !w-5 !h-5 !text-primary-color !mr-2;
}

.el-icon svg {
  @apply w-5 h-5;
}

.el-input__inner {
  @apply !grow !text-sm !bg-transparent !outline-none placeholder:text-primary-500 text-primary-color;
}
</style>