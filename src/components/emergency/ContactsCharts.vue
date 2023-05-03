<script setup lang="ts">
import { useTheme } from 'vuetify'
import { getLineChartConfig } from '@core/libs/chartjs/chartjsConfig'
import LineChart from '@core/libs/chartjs/components/LineChart'

import type { ChartJsCustomColors } from  '@/api/Emergency/dto';
interface Props {
  colors: ChartJsCustomColors
}

const props = defineProps<Props>()
const toggle_exclusive = ref(2)
const vuetifyTheme = useTheme()

const data = {
  labels: [-10, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
  datasets: [
   
    {
      fill: false,
      tension: 0.5,
      label: 'الشكاوي',
      pointRadius: 1,
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: props.colors.warningShade,
      backgroundColor: props.colors.warningShade,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: props.colors.white,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: props.colors.warningShade,
      data: [80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200, 280],
    },
    {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: 'تمت معالجتها',
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: props.colors.yellow,
      backgroundColor: props.colors.yellow,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: props.colors.white,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: props.colors.yellow,
      data: [80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180],
    },
  ],
}

const chartConfig = computed(() => getLineChartConfig(vuetifyTheme.current.value))
</script>

<template>
  <VRow>
<VCol cols="12" md="12">
<VCardText>
<div class="flex justify-between">
  <VCardTitle>
    
    <VIcon color="primary">tabler:clipboard-text</VIcon>  <VLabel>الشكاوي</VLabel> 
  </VCardTitle> 
 
  <v-btn-toggle v-model="toggle_exclusive">
    <v-btn>
   اليوم
    </v-btn>

    <v-btn>
    الشهر
    </v-btn>

    <v-btn>
      السنة
    </v-btn>

  
  </v-btn-toggle>
</div>

  
</VCardText>


<VCardText class="lg:mx-8">
  
</VCardText>
</VCol>

  </VRow>
  <LineChart
    :chart-options="chartConfig"
    :height="400"
    :chart-data="data"
  />
</template>
