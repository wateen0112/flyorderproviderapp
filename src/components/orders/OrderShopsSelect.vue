<script lang="ts" setup>
import { useOrderStore } from '@/stores/Order';
import { useSettingStore } from '@/stores/Setting'

const settingStore = useSettingStore()
const orderStore = useOrderStore()
const { selectedShop, orderCartProducts } = storeToRefs(orderStore)

const isLoadingShops = ref(false)

const shopsList = computed(() => {
  // const areaId = orderStore.

  return orderStore.currentOrderAreaID ? orderStore.orderShopsList.filter(s => s.areaId === orderStore.currentOrderAreaID) : orderStore.orderShopsList

})
</script>

<template>
  <div>
    <VList variant="elevated" class="p-2 gap-4 flex md:flex-col "
      lines="three">
      <VListItem v-for="item in shopsList" :key="item.id"
        :disabled="isLoadingShops" density="compact" class="rounded-md"
        :value="item" @click="selectedShop = item">
        <div class="flex justify-between items-center">
          <VListItemTitle>{{ item.name }}</VListItemTitle>
          <VBadge class="ml-2"
            :color="item.isOnline ? 'success' : 'error'" />
        </div>
        <div class="flex items-center  gap-2">
          <VListItemSubtitle>
            {{ settingStore.areaName(item.areaId) }}
          </VListItemSubtitle>
        </div>
      </VListItem>
    </VList>
    <p class="text-warning my-2   align-center text-center text-xs">
      (منتجات الطلب يجب ان تكون من نفس المنطقة)
    </p>
  </div>
</template>
