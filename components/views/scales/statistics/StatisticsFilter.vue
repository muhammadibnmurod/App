<template>
  <div class="flex items-center justify-end gap-4">
    <Select v-model="model.stationCode" :icon="OfficeBuilding"
      :options="stations?.items ? useGenerateOptions(stations?.items, 'code') : []" clearable
      :placeholder="$t('scales.statistics.select_station')" :loading="status === 'pending'" size="large"
      class="max-w-[250px]" @change="$emit('get')" />
    <DateRangePicker v-model="localValue" type="daterange" class="max-w-[280px]" :icon="Calendar" @change="change"
      size="large" />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main';
import type { StatisticsFilterParams } from '@/types';
import { Calendar, OfficeBuilding } from '@element-plus/icons-vue';

const mainStore = useMainStore();

const systemType = computed(() => mainStore.systemType)

const model = defineModel({
  default: {} as StatisticsFilterParams,
});

const props = defineProps({
  filterParamsInterval: {
    type: Object as () => StatisticsFilterParams,
    required: false
  },
  stationName: {
    type: String,
    required: false
  }
})

const localValue = ref<any>([
  model.value.start ? new Date(model.value.start) : null,
  model.value.end ? new Date(model.value.end) : null,
]);

const { data: stations, status } = await useApiService({
  params: {
    type: "station",
    systemsAll: systemType.value.scale
  }
}).Organizations.OrganizationsController_selectOrganizations();

const emit = defineEmits<{
  (get: "get"): void;
  (getStatistics: "getStatistics"): void;
}>();

const change = () => {
  if (localValue.value) {
    model.value.start = localValue.value[0]
      ? new Date(localValue.value[0]).toISOString()
      : new Date().toISOString();
    model.value.end = localValue.value[1]
      ? new Date(localValue.value[1]).toISOString()
      : new Date().toISOString();
  } else {
    model.value.start = undefined
    model.value.end = undefined
  }
  emit("get");
};

watch(
  () => model.value.stationCode,
  (newVal) => {
    if (props.filterParamsInterval) {
      props.filterParamsInterval.stationCode = newVal as any
    }
    emit('getStatistics')
  }
)


</script>