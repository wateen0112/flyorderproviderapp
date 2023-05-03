<script lang="ts" setup>
import { useOrderStore } from '@/stores/Order';

const orderStore = useOrderStore();
const selectedAddress = computed(() => orderStore.addresses?.find(a => a.id === orderStore.selectedAddress)?.text || '')
</script>

<template>
  <VCard class="flex justify-between p-4">
    <VCardTitle>معلومات الزبون</VCardTitle>
    <div class="flex items-center gap-2">
      <VIcon color="primary" icon="mdi-account-circle-outline" />
      <span>
        {{ orderStore.customerData?.name }}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <VIcon color="primary" icon="mdi-phone" />
      <span>
        {{ orderStore.customerData?.phoneNumber }}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <VIcon color="primary" icon="mdi-map-marker" />
      <span>
        {{ selectedAddress }}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <span>رقم الطلب : </span>
      <span>
        1525
      </span>
    </div>
    
  </VCard>
</template>
