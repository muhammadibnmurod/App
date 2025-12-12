<script setup lang="ts">
    import type { StatisticsFilterParams } from '@/types'

    const year = new Date().getFullYear()

    const filterParams = reactive<StatisticsFilterParams>({
      start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
      end: new Date().toISOString()
    })

    const filterParamsInterval = reactive<StatisticsFilterParams>({
      start: new Date(`${year}-01-01`).toISOString(),
      end: new Date(`${year}-12-31`).toISOString(),
      timeIntervalCount: 12
    })

    const { data, status, execute } = await useApiService({
      params: filterParams
    }).Wagon_Scale_Values.getScaleStatistics();

    const { data: intervalData, status: intervalStatus, execute: executeInterval } = await useApiService({
      params: filterParamsInterval
    }).Wagon_Scale_Values.getScaleIntervalStatistics();
</script>

<template>
    <div class="flex flex-col gap-4 flex-1" v-loading="status === 'pending' || intervalStatus === 'pending'">
      <StatisticsFilter v-model="filterParams" @get="execute()" :filterParamsInterval="filterParamsInterval" @getInterval="executeInterval"  />
      <stats-card v-if="data" :data="data" />

      <!-- extraWeightPercentage -->
      <div class="flex gap-4 flex-1">
        <template v-if="data?.byStation">
          <region-card  :data="data?.byStation"/>
        </template>
      </div>
    </div>
</template>

<style scoped>

</style>