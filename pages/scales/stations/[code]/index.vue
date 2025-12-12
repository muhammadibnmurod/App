<template>
  <StationDetailView v-if="code" :code="code" />
</template>
<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const route = useRoute();
const code = route.params.code as string;
const id = route.query.id as string;
const { setHeadTitle } = useHeadTitleStore();

const { locale } = useI18n();

const { data } = await useApiService().Wagon_Scale_Values.WagonScaleValueController_countByStation(id);
setHeadTitle(useGetTranslation(data.value?.organization.name));

watch(locale, () => {
  if (data.value?.organization.name) {
    setHeadTitle(data.value?.organization.name[locale.value as "uz" | "ru" | "ru" | "kril"] || data.value?.organization.name.uz);
  }
});
</script>