<script lang="ts" setup>
import { useFile } from '@/composables';
import { useCouponStore } from '@/stores/Coupon';
import { useOrderStore } from '@/stores/Order';

const { getFileUrl } = useFile()
const shopTab = ref()
const orderStore = useOrderStore()
const { confirmOrderDto } = storeToRefs(orderStore)
const couponStore = useCouponStore()
const selectedShops = computed(() => orderStore.selectedShops)
const cartProducts = computed(() => orderStore.orderCartProducts)
const visibleProducts = computed(() => cartProducts.value.filter(p => p.branchId === shopTab.value))
const offers = computed(() => couponStore.customerOrders)

watch(selectedShops, nv => {
  if (nv.length)
    shopTab.value = nv[nv.length - 1].id
}, { deep: true });
</script>

<template>
  <VCard>
    <template v-if="selectedShops.length">
      <VTabs v-model="shopTab">
        <VTab v-for="shop in selectedShops" :key="shop.id"
          :value="shop.id">
          {{ shop.name }}
        </VTab>
      </VTabs>

      <VList density="comfortable" class="space-y-12 max-h-[350px] mt-4">
        <VListItem v-for="item in visibleProducts" :key="item.id">
          <div class="flex gap-3">
            <VListItemMedia>
              <VAvatar class="border mt-2" size="x-large"
                :image="getFileUrl(item.imageUrl)" />
            </VListItemMedia>
            <div class="flex justify-center flex-col w-full">
              <div class="flex items-center">
                <h4>
                  {{ item.name }}
                </h4>
                <VBtn size="small" class="mx-2" variant="text"
                  icon="mdi-close" color="error"
                  @click="orderStore.removeCartItem(item.id)" />

                <div class="flex items-center gap-4 absolute left-2">
                  <VBtn icon="mdi-plus" size="small" variant="tonal"
                    @click="orderStore.setCartItemQuantity(item.id, item.quantity + 1)" />
                  <VTextField disabled :value="item.quantity"
                    variant="underlined" density="compact" class="w-20"
                    type="number" />
                  <VBtn icon="mdi-minus" size="small" variant="tonal"
                    @click="orderStore.setCartItemQuantity(item.id, item.quantity - 1)" />
                </div>
              </div>
              <div class="flex mt-2 w-full justify-between items-center">
                <VBtn class="pr-0" append-icon="mdi-pen" variant="text">
                  إضافة
                  ملاحظات
                </VBtn>

                <span>
                  {{ item.price }} ل.س
                </span>
              </div>
            </div>
          </div>
        </VListItem>
      </VList>
    </template>
    <template v-else>
      <div class="flex flex-col justify-center items-center">
        <span class="ring ring-main rounded-lg p-1 my-4">

          <VIcon size="40" color="primary" icon="mdi-cart" />
        </span>
        <h3 class="text-gray-400 text-center">سلة المنتجات فارغة </h3>
      </div>
    </template>

    <div class="p-2">
      <VSelect v-model="confirmOrderDto.offerId" :items="offers"
        item-value="id" item-title="name" label="الحسم على الطلب" />

      <VTextField v-model="confirmOrderDto.note" label="ملاحظات على الطلب"
        class="mt-4" />
    </div>
  </VCard>
</template>
