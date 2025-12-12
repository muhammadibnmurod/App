<template>
  <n-dropdown
      trigger="click"
      :options="dropdownOptions"
      @select="setLang"
      :render-label="renderDropdownLabel"
  >
    <div class="flex items-center gap-1.5 text-primary-color cursor-pointer">
      <img :src="flags[lang]?.flag" :alt="flags[lang]?.code" class="w-5 h-5" />
      <span class="uppercase">
        {{ flags[lang]?.code }}
      </span>
      <IconArrowDown class="w-5 h-5" />
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h, computed } from 'vue';
import { NDropdown, NIcon } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
import flagUzbek from "@/assets/images/flag/flagUzbekistan.png";
import flagRussia from "@/assets/images/flag/flagRussia.png";
import flagEngland from "@/assets/images/flag/flagEngland.png";
import { LangCodeEnum } from "@/types/common/translation";

interface Flag {
  name: string;
  flag: string;
  code: LangCodeEnum;
}

const { locale, setLocale } = useI18n();

const lang = computed(() => locale.value as LangCodeEnum);

const flags: Record<LangCodeEnum, Flag> = {
  [LangCodeEnum.UZ]: { name: "O'zbekcha", flag: flagUzbek, code: LangCodeEnum.UZ },
  [LangCodeEnum.KRIL]: { name: "Криллча", flag: flagUzbek, code: LangCodeEnum.KRIL },
  [LangCodeEnum.RU]: { name: "Русский", flag: flagRussia, code: LangCodeEnum.RU },
  [LangCodeEnum.EN]: { name: "English", flag: flagEngland, code: LangCodeEnum.EN }
};

const setLang = async (key: string) => {
  const code = key as LangCodeEnum;
  await setLocale(code);
  if (process.client) {
    localStorage.setItem('lang', code);
  }
};

const dropdownOptions = computed<DropdownOption[]>(() => {
  return Object.values(flags).map(item => ({
    label: item.name,
    key: String(item.code) // string bo'lishiga e'tibor bering
    // iconni olib tashladik
  }));
});

const renderDropdownLabel = (option: DropdownOption) => {
  // option.icon endi yo'q, shuning uchun flags orqali rasmni olish kerak bo'lsa:
  const flag = Object.values(flags).find(f => String(f.code) === String(option.key))?.flag;
  const img = flag ? h('img', { src: flag, class: 'w-5 h-5 rounded-full' }) : null;
  return h('div', { class: 'flex items-center gap-2' }, [ img, h('span', undefined, String(option.label)) ]);
};

</script>