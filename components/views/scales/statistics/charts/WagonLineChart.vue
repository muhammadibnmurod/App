<template>
  <div
    class="w-full p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist h-full min-h-[400px]">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-col gap-1">
        <span class="text-primary-color font-semibold">{{ t('scales.statistics.wagons_statistics_by_period') }}</span>
        <span class="text-primary-100 dark:text-gray-500 text-[13px]">
          <!-- #FIX{{ t('scales.statistics.measuredWagonsCount') }}: total -->
          {{ t('scales.statistics.measuredWagonsCount') }}
        </span>
      </div>
      <div class="mr-5">
        <span>
          {{ $t('scales.statistics.forYear', { year }) }}
        </span>
      </div>
    </div>
    <div class="flex flex-col px-2 py-3 rounded-lg bg-surface-40 border border-surface-30 h-full">
      <EChart :option="option" autoresize style="width: 100%; height: 100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { EChartsOption } from "echarts";

type ScaleIntervalResponse = components["schemas"]["ScaleIntervalResponse"];

const props = defineProps({
  data: {
    type: Object as () => ScaleIntervalResponse,
    required: true,
  },
  stationCode: {
    type: String,
    required: false,
  },
});

const year = new Date().getFullYear()
const { t } = useI18n();


const option = computed<EChartsOption>(() => {
  return {
    grid: {
      top: 30,
      right: 0,
      left: 0,
      bottom: 45
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#FFFFFF",
      borderColor: "#E4E9F2",
      borderWidth: 1,
      padding: 10,
      textStyle: {
        color: "#1B1F33",
        fontSize: 14
      },
      formatter: (params: any) => {
        let result = `<span style="font-weight: bold;">${params[0].axisValue}</span><br/>`;
        params.forEach((item: any) => {
          result += `<span style="display:inline-block;margin-right:5px;
          border-radius:10px;width:9px;height:9px;
          background-color:${item.color};"></span>
          ${item.seriesName}: <strong>${item.data}</strong><br/>`;
        });

        return result;
      }
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        t('months.january'),
        t('months.february'),
        t('months.march'),
        t('months.april'),
        t('months.may'),
        t('months.june'),
        t('months.july'),
        t('months.august'),
        t('months.september'),
        t('months.october'),
        t('months.november'),
        t('months.december')
      ],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#1B1F33",
        fontSize: 14,
        padding: [10, 0, 0, 0]
      }
    },

    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#AAB3C1",
        fontSize: 13
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(170, 179, 193, 0.25)"
        }
      }
    },

    series: [
      {
        type: "line",
        smooth: true,
        symbol: "none",
        data: props.data.intervals.map((x) => x.totalCount),
        name: t('scales.statistics.total_count'),
        color: 'blue',
        lineStyle: {
          width: 4,
          color: "#5A78FF"
        },
        areaStyle: {
          color: "rgba(90, 120, 255, 0.20)"
        }
      },
      {
        type: "line",
        smooth: true,
        symbol: "none",
        data: props.data.intervals.map((x) => x.extraWeightedCount),
        name: t('scales.statistics.extra_weighted_wagons'),
        color: 'red',
        lineStyle: {
          width: 4,
          color: "#FA6298"
        },
        areaStyle: {
          color: "rgba(250, 98, 152, 0.2)"
        }
      }
    ]
  }
});
</script>
