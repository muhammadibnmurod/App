<template>
  <div class="p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist flex-1">
    <div class="flex justify-between items-center">
      <div class="flex flex-col gap-1">
        <span class="text-primary-color font-semibold">{{ $t('scales.statistics.forStations') }}</span>
        <span class="text-primary-100 dark:text-gray-500 text-[13px]">{{
            $t('scales.statistics.confirmed_wagons_by_region') }}</span>
      </div>
      <div class="flex gap-2 mr-5">
        <div class="flex">
          <div class="bg-danger-50 border-danger-20 w-4 h-4 rounded-md border"></div>
          <span class="text-[12px] font-medium text-primary-100 dark:text-gray-500 ml-1">{{
              $t('scales.statistics.overloaded') }}</span>
        </div>
        <div class="flex">
          <div class="bg-success-100 border-success-50 w-4 h-4 rounded-md border"></div>
          <span class="text-[12px] font-medium text-primary-100 dark:text-gray-500 ml-1">{{
              $t('scales.statistics.within_norm') }}</span>
        </div>
      </div>
    </div>

    <div
        class="flex flex-col px-2 py-5 rounded-lg bg-surface-40 border border-surface-30 overflow-y-auto max-h-[280px]">
      <div class="flex flex-col" v-for="(item, index) in data" :key="index">
        <div class="flex gap-2 items-center">
          <div class="border-[2px] rounded-full p-2 border-surface-30 bg-surface-50 flex items-center justify-center">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
          </div>

          <div class="flex flex-col flex-1">
            <span class="text-primary-color font-semibold">
              {{ useGetTranslation(item.station?.name) }}
            </span>
            <span class="text-primary-100 dark:text-gray-500 text-[13px]">{{ $t('wagons.title') }}: {{ item.totalCount
              }}</span>
          </div>

          <div
              class="border-[2px] rounded-md px-2 py-0.5 bg-danger-50 border-danger-20 w-10 h-10 flex justify-center items-center">
            <span class="text-white font-semibold">{{ item.extraWeightedCount }}</span>
          </div>

          <div
              class="border-[2px] rounded-md px-2 py-0.5 bg-success-100 border-success-50 w-10 h-10 flex justify-center items-center">
            <span class="text-white font-semibold">{{ item.totalCount - item.extraWeightedCount }}</span>
          </div>
        </div>
        <div class="w-full h-[1px] bg-surface-30 my-1" v-if="index + 1 !== data?.length"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';
import { OfficeBuilding } from '@element-plus/icons-vue';

type ScaleStatisticsByStationItem = components['schemas']['ScaleStatisticsByStationItem'];

const props = defineProps({
  data: {
    type: Object as () => ScaleStatisticsByStationItem[],
    required: false,
  },
});
</script>
