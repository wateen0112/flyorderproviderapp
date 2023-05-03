<script setup lang="ts">
import { useTheme } from 'vuetify'
import BarChart from '@/@core/libs/chartjs/components/BarChart'
import type { ChartJsCustomColors } from  '@/api/Emergency/dto';
import { getLatestBarChartConfig } from '@core/libs/chartjs/chartjsConfig'

interface Props {
  colors: ChartJsCustomColors
}

const props = defineProps<Props>()

const vuetifyTheme = useTheme()

const chartOptions = computed(() => getLatestBarChartConfig(vuetifyTheme.current.value))

const data = {
  labels: [
    "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
  ],
  datasets: [
    {
      maxBarThickness: 15,
      backgroundColor: props.colors.barChartYellow,
      borderColor: 'transparent',
      borderRadius: { topRight: 15, topLeft: 15 },
      data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280],
    },
  ],
}
</script>

<template>
  <BarChart
    :height="400"
    :chart-data="data"
    :chart-options="chartOptions"
  />
</template>
