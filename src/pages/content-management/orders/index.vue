<script lang="ts" setup>
import AddOrder from '@/components/orders/AddOrder.vue';
import Page from '@/components/shared/Page.vue';
import OrdersTable from '@/components/orders/OrdersTable.vue';
import { useOrderStore } from '@/stores/Order';
import { useAppStore } from '@/stores/App';

const { SetPageMeta } = useAppStore();

const orderStore = useOrderStore();

onMounted(() => {
  SetPageMeta({
    title: 'الطلبات',
    icon: 'mdi-cart',
    breadCrumb: [],
  })
})

const orders = computed(() => orderStore.orders)

orderStore.GetAllOrder();
</script>

<template>
  <div>
    <Page ref="Order" dialog-title="إضافة طلب جديد" :has-search="false"
      placeholder="ابحث عن طلب معين" button-text="طلب جديد"
      icon="mdi-cart">
      <template #action-button>
        <VBtn pend-icon="mdi-cart-plus"
          to="/content-management/orders/CustomerSearch">
          إضافة طلب </VBtn>
      </template>

      <OrdersTable :orders="orders" />
    </Page>
  </div>
</template>

