<template>
  <div class="grid grid-cols-4 gap-4">
    <card v-for="(card, index) in cardInformations" :key="index" :hasIcon="false">
      <template #title>
        {{ card.title }}
      </template>
      <template #total>
        {{ card.total }}
      </template>
      <template #icon>
        <component :is="card.icon" class="text-info-100 w-4 h-4" />
      </template>
      <!-- <template #increment>
        <div class="border-[2px] py-0.5 px-2 text-white rounded-[26px]" :class="Number(card.increment) < 0
          ? 'bg-danger-100 border-danger-50'
          : Number(card.increment) < 100
            ? 'bg-warning-100 border-warning-50'
            : 'bg-success-100  border-success-50'
          ">
          <span class="font-semibold text-sm">
            {{ card.increment }}
          </span>
        </div>
      </template> -->
      <!-- <template #icon>
        <component :is="card.icon" class="text-info-100" />
      </template>
      <template #comparisonText>
        {{ card.comparisonText }}
      </template> -->
    </card>
  </div>
</template>

<script setup lang="ts">
import { IconNoteList, IconWagon } from '#components';
import type { components } from '@/api/apiMethods.types';


type ScaleStatisticsResponse = components['schemas']['ScaleStatisticsResponse']

const { t } = useI18n();

const props = defineProps<{
  data: ScaleStatisticsResponse;
}>();

const cardInformations = computed(() => [
  {
    title: t("scales.statistics.total_count"),
    total: props.data.totalCount || 0,
    increment: "+245",
    icon: IconWagon,
    comparisonText: "O'tgan oyga nisbatan:"
  },
  {
    title: t("scales.statistics.total_weight"),
    total: (Number(props.data.totalWeight) / 1000).toFixed(0) || 0,
    increment: "+27",
    icon: IconNoteList,
    comparisonText: "O'tgan oyga nisbatan:"
  },
  {
    title: t("scales.statistics.extra_weighted_wagons"),
    total: props.data.extraWeightedCount || 0,
    increment: "+117",
    icon: IconWagon,
    comparisonText: "O'tgan oyga nisbatan:"
  },
  {
    title: t("scales.statistics.extra_weight"),
    total: (Number(props.data.extraWeight) / 1000).toFixed(0) || 0,
    increment: "-20",
    icon: IconNoteList,
    comparisonText: "O'tgan oyga nisbatan:"
  }
]);
</script>
