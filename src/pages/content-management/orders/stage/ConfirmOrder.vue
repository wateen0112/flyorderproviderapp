<script lang="ts" setup>
import OrderCustomerInfo from '@/components/orders/OrderCustomerInfo.vue';
import OrderShopsSelect from '@/components/orders/OrderShopsSelect.vue';
import OrderStepper from '@/components/orders/OrderStepper.vue';
import CategoryList from '@/components/products/CategoryList.vue';
import OrderProductsCart from '@/components/orders/OrderProductsCart.vue'
import OrderInvoice from '@/components/orders/OrderInvoice.vue'
import { useOrderStore } from '@/stores/Order';
import type { OrderCart } from '@/api/Order/dto';
import type { Product } from '@/api/Product/dto';

const tab = ref()
const isPrior = ref(false)
const orderStore = useOrderStore();
const orderAreaId = computed(() => orderStore.currentOrderAreaID)

const { selectedShop, confirmOrderDto } = storeToRefs(orderStore)

const selectedShopId = computed(() => selectedShop.value?.id)

const handleTabChange = (e: any) => {
  orderStore.GetProductsForSelectedShop(e)
}

const addToCartHandler = (product: Product) => {
  if (selectedShopId.value)
    orderStore.AddProductToCart({ ...product, branchId: selectedShopId.value, quantity: 1, note: '' })

}

watch(selectedShopId, newValue => {

  if (newValue)

    orderStore.GetProductsForSelectedShop(newValue)

}, { deep: true })

watch(isPrior, nv => {
  if (nv === false)
    confirmOrderDto.value.priorDate = null

})
orderStore.GetConfirmAdd()
</script>

<template>
  <div class="grid lg:grid grid-cols-12 p-2 gap-2">
    <div class=" hidden lg:block lg:gridcol-span-12 lg:col-span-2">
      <OrderStepper />
    </div>
    <div class="col-span-12 lg:col-span-7 ">
      <OrderCustomerInfo />
      <div class="grid grid-cols-12 mt-2 gap-2">
        <div class="xl:col-span-3 col-span-12 max-h-[720px] overflow-auto">
          <OrderShopsSelect />
        </div>
        <div class="col-span-12 lg:col-span-9">
          <CategoryList :category-list="orderStore.categoriesWithProducts"
            @addProductToCart="addToCartHandler" />
        </div>
      </div>
    </div>

    <div class="lg:col-span-3 col-span-12">
      <OrderProductsCart />
      <OrderInvoice />
      <VCard class="p-2 mt-2">
        <div>
          <VCheckbox v-model="isPrior" direction="horizontal"
            label="الطلب مسبق" />
        </div>
        <div class="my-4">

          <AppDateTimePicker label="تاريخ التسليم" v-if="isPrior"
            :config="{ enableTime: true }"
            v-model="confirmOrderDto.priorDate" />
        </div>

        <VBtn block variant="flat" @click="orderStore.ConfirmOrder()">
          انشاء الطلب</VBtn>

      </VCard>
    </div>
  </div>
</template>
