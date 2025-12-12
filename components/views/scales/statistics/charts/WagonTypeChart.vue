<script setup lang="ts">
    import { IconNoteList, IconWagon } from '#components'
    import type { components } from '@/api/apiMethods.types'

    type ScaleStatisticsResponse = components['schemas']['ScaleStatisticsResponse']

    const { t } = useI18n();
    const props = defineProps<{
      data: ScaleStatisticsResponse
    }>()

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

<template>

</template>

<style scoped>

</style>