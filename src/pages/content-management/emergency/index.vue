<script setup lang="ts">
import OrdersChar from "@/components/emergency/OrdersChar.vue";
import { useTheme } from "vuetify";
import Page from "@/components/shared/Page.vue";
import { hexToRgb } from "@layouts/utils";
import EcommerceStatics from "@/components/emergency/EcommerceStatics.vue";
import ContactsCharts from "@/components/emergency/ContactsCharts.vue";
import Crm from "@/components/emergency/Crm.vue";
import ExpenseRatio from "@/components/emergency/ExpenseRatio.vue";
import EMsg from '@/components/emergency/Emsg.vue'
import CrmBrowser from "@/components/emergency/CrmBrowser.vue";

import EcommerceTotalProductsLineChart from "@/components/emergency/EcommerceTotalProductsLineChart.vue";

import type { ChartJsCustomColors } from "@/api/Emergency/dto";
import { useAppStore } from '@/stores/App';
const onLoad = () => {
  useAppStore().SetPageMeta({
    breadCrumb: [],
    icon: 'tabler:car',
    title: 'نظام الطوارئ',
  })
}
const toggle_exclusive= ref(1)
const vuetifyTheme = useTheme();
const chartJsCustomColors: ChartJsCustomColors = {
  white: "#fff",
  yellow: "#ffe802",
  primary: "#836af9",
  areaChartBlue: "#2c9aff",
  barChartYellow: "#ffcf5c",
  polarChartGrey: "#4f5d70",
  polarChartInfo: "#299aff",
  lineChartYellow: "#d4e157",
  polarChartGreen: "#28dac6",
  lineChartPrimary: "#9e69fd",
  lineChartWarning: "#ff9800",
  horizontalBarInfo: "#26c6da",
  polarChartWarning: "#ff8131",
  scatterChartGreen: "#28c76f",
  warningShade: "#ffbd1f",
  areaChartBlueLight: "#84d0ff",
  areaChartGreyLight: "#edf1f4",
  scatterChartWarning: "#ff9f43",
};
const series = [
  {
    data: [40, 65, 50, 45, 90, 55, 70, 50, 45, 90, 55, 70],
  },
];
const dateTieFilter = [
  {
    
  }
]
const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;

  return {
    chart: {
      parentHeightOffset: 0,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: "90%",
        columnWidth: "20%",
        startingShape: "rounded",
        endingShape: "rounded",
        borderRadius: 4,
        distributed: true,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        bottom: 0,
        left: -10,
        right: -10,
      },
    },
    colors: [
      `rgba(${hexToRgb(currentTheme.primary)},${variableTheme["pressed-opacity"]})`,
      `rgba(${hexToRgb(currentTheme.primary)},${variableTheme["pressed-opacity"]})`,
      `rgba(${hexToRgb(currentTheme.primary)},${variableTheme["pressed-opacity"]})`,
      `rgba(${hexToRgb(currentTheme.primary)},${variableTheme["pressed-opacity"]})`,
      currentTheme.primary,
      `rgba(${hexToRgb(currentTheme.primary)},${variableTheme["pressed-opacity"]})`,
      `rgba(${hexToRgb(currentTheme.primary)},${variableTheme["pressed-opacity"]})`,
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: `rgba(${hexToRgb(currentTheme["on-surface"])},${
            variableTheme["disabled-opacity"]
          })`,
          fontSize: "14px",
          fontFamily: "Public Sans",
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 1025,
        options: {
          chart: {
            height: 199,
          },
        },
      },
    ],
  };
});
onLoad()
</script>

<template>
<Page
:has-search="false"  
dialog-title="  رسالة تنبيه جديدة"


icon="tabler-baby-carriage"

>
  <template
  
  
  #dialog-form>
    <EMsg/>
  </template>
  <VRow class="mt-5">

    <VCol cols="12" md="12">
      <VRow>
        <VCol cols="12" md="8">
          <EcommerceStatics />
        </VCol>
        <VCol cols="12" md="4">
          <EcommerceTotalProductsLineChart />
        </VCol>
      </VRow>

      <VCard class="mt-5">
        <VCol cols="12" md="12">
          <h2><VIcon color="primary">tabler:basket</VIcon> توزع الطلبات</h2>
        </VCol>
        <VCol cols="12" md="12" class="pt-0">
          <OrdersChar :colors="chartJsCustomColors" />
        </VCol>
      </VCard>
    </VCol>
    <VCol cols="12" md="8">
      <VCard> <Crm /></VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VCard> <CrmBrowser /></VCard>
    </VCol>
    <VCol cols="12" md="12">
      <VCard>
   <ContactsCharts  :colors="chartJsCustomColors"/>

       
      </VCard>
    </VCol>
    <VCol cols="12" md="12">
      
      <VCard>
      <VCardText class="my-3">
        <VRow class="">
          <VCol cols="12" md="4"> <VCardTitle><VIcon color="primary">tabler:clipboard-text</VIcon>الأكثر طلبا </VCardTitle></VCol>
          <VCol cols="12" md="4" >

<V-tabs>
  <v-tab>الزبائن</v-tab>
  <v-tab>المتاجر</v-tab>
</V-tabs>

          </VCol>
          <VCol cols="12" md="4">
 <div class="flex  justify-center">
           
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
          </VCol>
        </VRow>
      </VCardText>
        <VRow>
          <VCol cols="12" md="4"> <ExpenseRatio /></VCol>
          <VCol cols="12" md="8">
            <VTable class="mt-5">
              <thead>
                <tr >
                  <th> <h3>اسم الزبون</h3></th>
                  <th>عدد الطلبات</th>
                  <th>رقم الزبون</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>اسم افتراضي</td>
                <td>عدد افتراضي</td>
                <td>رقم افتراضي</td></tr>
                <tr><td>اسم افتراضي</td>
                <td>عدد افتراضي</td>
                <td>رقم افتراضي</td></tr>
                <tr><td>اسم افتراضي</td>
                <td>عدد افتراضي</td>
                <td>رقم افتراضي</td></tr>
                <tr><td>اسم افتراضي</td>
                <td>عدد افتراضي</td>
                <td>رقم افتراضي</td></tr>

              </tbody>
            </VTable>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</Page>
</template>
