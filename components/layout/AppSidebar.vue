<template>
  <div class="w-[260px] shrink-0 h-screen flex flex-col gap-6 p-4">
    <button class="h-11 flex items-center gap-2 rounded-lg py-1.5 px-2 border border-surface-40">
      <div
          class="h-8 flex gap-1.5 items-center justify-center py-1 px-2.5 rounded-md bg-[#040B4B] border border-[#3A3F6E]">
        <span class="font-semibold text-xl text-white">
          {{ $t("ai.title") }}
        </span>

        <span class="w-2 h-2 rounded-full bg-[#EA2727]"></span>
      </div>

      <span class="text-xl text-primary-color uppercase">
        {{ $t("camera.title") }}
      </span>
    </button>

    <n-dropdown
        trigger="click"
        :options="platformOptions"
        :render-option="renderDropdownOption"
        v-model:show="showDropdown"
    >
      <button
          class="h-[58px] flex w-full items-center justify-between gap-2 py-2.5 px-2 rounded-lg bg-surface-40 border border-surface-30">
        <div class="flex items-center gap-2">
          <div :class="[
            'px-1.5 py-1 rounded-md border',
            selectedPlatform === 'scales' && 'bg-[#893DF3] border-[#C499FF]',
            selectedPlatform === 'camera' && 'bg-[#3D89F3] border-[#99C4FF]',
            selectedPlatform === 'helmet' && 'bg-[#38CDA8] border-[#5EF2CD]',
            selectedPlatform === 'app' && 'bg-[#F3A33D] border-[#FFC499]',
            selectedPlatform === 'chat' && 'bg-[#42C2FF] border-[#99E1FF]',
          ]">
            <icon-platform class="w-6 h-6 text-white" />
          </div>

          <div class="flex flex-col gap-1 items-start">
            <div class="text-xs leading-3 text-primary-100 dark:text-primary-500">
              {{ $t("platform.title") }}
            </div>

            <div class="text-sm leading-4 font-semibold text-primary-color">
              {{ $t(`platform.${selectedPlatform}`) }}
            </div>
          </div>
        </div>

        <IconChevronDown class="text-primary-color" />
      </button>
    </n-dropdown>

    <div v-if="navItem" class="flex flex-col gap-1 flex-1 overflow-y-auto">
      <template v-for="route in navItem.routes" :key="route.route">
        <RouterLink :to="navItem.route + route.route" v-can="route.permission" :class="[
          $route.path.includes(route.route)
            ? 'bg-surface-40 border-surface-30 text-primary-color'
            : 'border-transparent text-primary-100 dark:text-primary-500'
        ]" class="flex items-center gap-2 py-2.5 px-2 rounded-lg hover:bg-surface-40 border">
          <component :is="route.icon" class="w-5 h-5 text-primary-color" />

          <span class="text-sm font-medium">
            {{ route.title }}
          </span>
        </RouterLink>
      </template>
    </div>

    <div class="border border-surface-30 rounded-xl py-2.5 px-2 bg-surface-40 flex items-center gap-2">
      <div>
        <IconProfile class="w-6 h-6" />
      </div>
      <div class="flex flex-col flex-1 text-sm">
        <span class="font-bold">
          {{ userInfo?.accountRole.account.profile?.firstName }}
          {{ userInfo?.accountRole.account.profile?.lastName }}
        </span>
        <span>
          {{ userInfo?.accountRole.role.name }}
        </span>
      </div>
      <div>
        <IconChevronRight class="text-primary-color w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { platformRoutes } from "@/constants";
import { navigation } from "@/navigation";
import { SystemType } from "@/store/main";
import { usePermissionStore } from "@/store/permissionStore";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const router = useRouter();

const showDropdown = ref(false);

const selectedPlatform = computed<"scales" | "camera" | "helmet" | "app" | "chat">(
    () =>
        router.currentRoute.value.path.split("/")[1] as
            | "scales"
            | "camera"
            | "helmet"
            | "app"
            | "chat"
);

const permissionStore = usePermissionStore();
const { permission, getPermissions } = storeToRefs(permissionStore);

const navItem = computed(() => {
  return navigation(t)[selectedPlatform.value]?.find(nav => nav.isActive);
});

const userInfo = computed(() => permissionStore.userInfo);
const systems = computed<number>(() => permissionStore.userInfo?.accountRole.systems ?? 0);

const hasPermission = (required: SystemType) =>
    (systems.value & required) === required;

const allowedPlatformRoutes = computed(() =>
    platformRoutes.filter(r => hasPermission(r.permission))
);

const getPlatformColor = (key: string) => {
  const colors: Record<string, { bg: string; border: string }> = {
    scales: { bg: 'bg-[#893DF3]', border: 'border-[#C499FF]' },
    camera: { bg: 'bg-[#3D89F3]', border: 'border-[#99C4FF]' },
    helmet: { bg: 'bg-[#38CDA8]', border: 'border-[#5EF2CD]' },
    app: { bg: 'bg-[#F3A33D]', border: 'border-[#FFC499]' },
    chat: { bg: 'bg-[#42C2FF]', border: 'border-[#99E1FF]' },
  }
  return colors[key] || { bg: 'bg-gray-500', border: 'border-gray-400' }
}

const platformOptions = computed(() =>
    allowedPlatformRoutes.value.map(item => ({
      label: t(item.title),
      key: item.key,
    }))
)

const renderDropdownOption = ({ node, option }: any) => {
  const colors = getPlatformColor(option.key)
  const isSelected = selectedPlatform.value === option.key

  const IconPlatform = resolveComponent('icon-platform')
  const IconCheck = resolveComponent('icon-check')

  return h(
      'div',
      {
        class: [
          'mx-2 my-1 px-2 py-2.5 border rounded-lg flex items-center justify-between gap-2 cursor-pointer',
          isSelected
              ? 'bg-surface-40 border-surface-30'
              : 'border-transparent hover:bg-surface-40 hover:border-surface-30'
        ],
        onClick: () => handleSelect(option.key)
      },
      [
        h('div', { class: 'flex items-center gap-2' }, [
          h(
              'div',
              {
                class: `px-1.5 py-1 rounded-md border ${colors.bg} ${colors.border}`
              },
              [
                h(IconPlatform, { class: 'w-6 h-6 text-white' })
              ]
          ),
          h('div', { class: 'flex flex-col gap-1 items-start' }, [
            h('div', {
              class: 'text-xs leading-3 text-primary-100 dark:text-primary-500'
            }, t('platform.title')),
            h('div', {
              class: 'text-sm leading-4 font-semibold text-primary-color'
            }, option.label)
          ])
        ]),
        isSelected && h(IconCheck, { class: 'w-5 h-5 text-primary-color' })
      ]
  )
}

const handleSelect = (key: string) => {
  const item = allowedPlatformRoutes.value.find(r => r.key === key);
  if (item) {
    router.push(item.route);
  }
};
</script>