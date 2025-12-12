<template>
  <CameraWagonsDetailView v-if="id" :id="id" />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const route = useRoute();
const id = route.params.id as string;
const { setHeadTitle } = useHeadTitleStore();

const { locale } = useI18n();

const { data } = await useApiService().WagonSession.WagonSessionController_countByStation(id);
setHeadTitle(useGetTranslation(data.value?.organization?.name));

watch(locale, () => {
  if (data.value?.organization?.name) {
    setHeadTitle(data.value?.organization.name[locale.value as "uz" | "ru" | "ru" | "kril"] || data.value?.organization.name.uz);
  }
});

</script>