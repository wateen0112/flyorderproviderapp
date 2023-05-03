<script lang="ts" setup>
import { useAppStore } from '@/stores/App';
import Page from '@/components/shared/Page.vue';
import { useInvoiceStore } from '@/stores/Invoice';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useInvoiceStore();

store.GetAllBranchInvoice();

function goToDetails(id: string) {
  router.push(`/content-management/invoice/shop/${id}`);
}

const onLoad = () => {
  useAppStore().SetPageMeta({
    breadCrumb: [],
    icon: 'mdi-currency-usd',
    title: 'كشف حساب المطاعم',
  });
};

onLoad();
</script>

<template>
  <Page :add="false" :has-search="false">
    <div>
      <VTable class="text-no-wrap invoice-list-table">
        <!-- 👉 Table head -->
        <thead>
          <tr>
            <th scope="col">
              اسم المطعم
            </th>
            <th scope="col">
              تاريخ اخر مطابقة
            </th>
            <th scope="col">
              عدد الطلبات
            </th>
            <th scope="col">
              عدد الطلبات الغير محاسبة
            </th>
            <th scope="col">
              صافي الأرباح
            </th>
            <th scope="col">
    تفاصيل
    </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.BranchInvoiceList" :key="item.id">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ new Date(item.lastInvoiceDate).toLocaleDateString() }}
            </td>
            <td>
              {{ item.ordersCount }}
            </td>
            <td>
              {{ item.unPaidOrdersCount }}
            </td>
            <td>
              {{ item.incoming }}
            </td>
            <td>
              <VBtn icon size="lg" variant="text" @click="goToDetails(item.id)">
                <VIcon>mdi-dots-vertical</VIcon>
              </VBtn>
            </td>
          </tr>
        </tbody>

        <!-- 👉 Table Body -->
      </VTable>
    </div>
    <!-- !SECTION -->
  </Page>
</template>
