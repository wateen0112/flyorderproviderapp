<script lang="ts" setup>
import Page from "@/components/shared/Page.vue";
import { useCouponStore } from "@/stores/Coupon";
import { useCustomerStore } from "@/stores/Customer";
import { useShopStore } from "@/stores/Shop";
import {
  VAutocomplete,
  VBtn,
  VCard,
  VCardText,
  VCol,
  VForm,
  VRadio,
  VRadioGroup,
  VRow,
  VTextarea,
  VTextField,
} from "vuetify/components";
import { requiredValidator } from "@/@core/utils/validators";
import { getCouponByIdDto } from "@/api/Coupon/dto";
import { RouterLink } from "vue-router";
import { useAppStore } from "@/stores/App";
const store = useCouponStore();
const customerStore = useCustomerStore();
const shopStore = useShopStore();
const refForm = ref<InstanceType<typeof VForm>>();
const { coupon } = storeToRefs(store);
const { CustomerList } = storeToRefs(customerStore);
const { shops } = storeToRefs(shopStore);

const onLoad = () => {
  useAppStore().SetPageMeta({
    breadCrumb: [],
    icon: "tabler:percentage",
    title: "تفاصيل كود الحسم",
  });
};

const props = defineProps(["id"]);

onBeforeMount(() => {
  store.getById(props.id);
  shopStore.GetAllBranches();
  customerStore.GetAllCustomer();
});
// watch(coupon.value.branchId,()=>{
//   shopStore.GetBranchesId(coupon.value.branchId)

// })
const submit = () => {
  refForm.value?.validate().then((res) => {
    if (res.valid) {
      if (
        coupon.value.discount.value > coupon.value.baseOrderAmount &&
        coupon.value.discount.valueType === "Value"
      ) {
        errors.value.baseOrderAmount = "يجب ان  يكون مقدار الحسم اصغر من الحد الأدنى ";
        errors.value.discountValue = "يجب ان  يكون مقدار الحسم اصغر من الحد الأدنى ";
      } else {
        errors.value.baseOrderAmount = "";
        errors.value.discountValue = "";
        store.modify();
      }
    }
  });
};
const errors = ref<Record<string, string>>({
  name: "",
  baseOrderAmount: "",
  limit: "",
});
onBeforeUnmount(() => {
  coupon.value = new getCouponByIdDto();
});
onLoad();
</script>

<template>
  <Page :hasSearch="false" :add="false">
    <template #header> </template>
    <template #action-button>
      <VBtn variant="tonal" class="mx-1" @click="submit">تعديل </VBtn>
      <VBtn
        class="mx-1"
        variant="tonal"
        color="error"
        @click="store.deleteCoupon(props.id)"
        >حذف
      </VBtn>
      <router-link to="../setting/coupons"
        ><VBtn class="mx-1" variant="outlined">تراجع </VBtn></router-link
      >
    </template>
    <VForm ref="refForm">
      <VCard class="my-5">
        <VCardText class="mb-5">
          <VRow>
            <VCol cols="12" md="4">
              <div class="my-5">
                <h5 class="my-2">كود الحسم</h5>
                <VTextField
                  :disabled="true"
                  v-model="coupon.code"
                  append-inner-icon="tabler:replace"
                />
              </div>

              <div class="my-5">
                <h5 class="my-2">اسم كود الحسم</h5>
                <VTextField
                  :rules="[requiredValidator]"
                  :error-messages="errors.name"
                  v-model="coupon.name"
                />
              </div>
            </VCol>

            <VCol cols="12" md="4">
              <div class="my-5">
                <h5 class="my-2">تاريخ بداية تفعيل كود الحسم</h5>
                <VTextField :disabled="true" v-model="coupon.dateTimeRange.start" />
              </div>

              <div class="mt-5">
                <h5 class="my-2">تاريخ نهاية تفعيل كود الحسم</h5>
                <VTextField :disabled="true" v-model="coupon.dateTimeRange.end" />
              </div>
            </VCol>
            <VCol cols="12" md="4">
              <div class="">
                <h5 class="my-3">نوع الكود</h5>

                <div class="mt-10 mb-9">
                  <VRadioGroup
                    :disabled="true"
                    v-model="coupon.offerType"
                    class="flex"
                    inline
                  >
                    <VRadio label="لمتجر" value="Branch" density="compact" />
                    <VRadio value="Customer" label="لشخص محدد" density="compact" />
                    <VRadio value="Products" label=" لمنتجات" density="compact" />
                  </VRadioGroup>
                </div>
              </div>
              <VAutocomplete
                :disabled="true"
                v-if="coupon?.offerType === 'Branch'"
                label="ابحث عن متجر محدد"
                :items="shops"
                v-model="coupon.branchId"
                item-title="name"
                item-value="id"
              />
              <div v-if="coupon?.offerType === 'Customer'">
                <h5 class="mt-2 my-2">اسم الشخص</h5>
                <VAutocomplete
                  :disabled="true"
                  v-model="coupon.customerId"
                  label="ابحث عن شخص محدد"
                  :items="CustomerList"
                  item-title="name"
                  item-value="id"
                />
              </div>
              <div v-if="coupon?.offerType === 'Products'">
                <VAutocomplete
                  :disabled="true"
                  label="ابحث عن متجر محدد"
                  :items="shops"
                  v-model="coupon.branchId"
                  item-title="name"
                  item-value="id"
                />
                <h5 class="mt-5 my-2">إضافة المنتجات</h5>
                <VAutocomplete
                  v-model="coupon.productIds"
                  item-title="name"
                  item-value="id"
                  label="ابحث عن منتج محدد"
                />
              </div>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="4">
              <div>
                <h5>الحسم</h5>

                <VRadioGroup
                  :disabled="true"
                  v-model="coupon.discount.valueType"
                  class="flex"
                  inline
                >
                  <VRadio label="نسبة" value="Percentage" density="compact" />
                  <VRadio label="مبلغ نقدي" value="Value" density="compact" />

                  <VTextField
                    :disabled="true"
                    :prefix="coupon.discount.valueType === 'Percentage' ? '%' : ''"
                    class="mx-5 my-2"
                    v-model="coupon.discount.value"
                  />
                </VRadioGroup>
              </div>
              <div class="my-5">
                <h5 class="my-2">كود الحسم على حساب</h5>

                <VRadioGroup
                  :disabled="true"
                  v-model="coupon.offerOn"
                  class="flex"
                  inline
                >
                  <VRadio label="المتجر" value="Branch" density="compact" />
                  <VRadio value="System" label=" الأدمن" density="compact" />
                </VRadioGroup>
              </div>
            </VCol>
            <VCol cols="12" md="4">
              <div class="mt-0 mb-0">
                <h5 class="my-2 mb-5">إضافة وصف عن كود الحسم</h5>
                <VTextarea v-model="coupon.description" class="mb-10 mt-14" />
              </div>
              <VRow class="mt-0">
                <VCol cols="6" md="6">
                  <h5 class="my-2">الحد الأدنى للطلب</h5>
                  <VTextField
                    :rules="[requiredValidator]"
                    :error-messages="errors.baseOrderAmount"
                    type="number"
                    v-model.number="coupon.baseOrderAmount"
                  />
                </VCol>
                <VCol cols="6" md="6">
                  <h5 class="my-2">عدد مرات الاستفادة</h5>
                  <VTextField
                    type="number"
                    v-model.number="coupon.limit"
                    :rules="[requiredValidator]"
                    :error-messages="errors.limit"
                  />
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VForm>
  </Page>
</template>
<style>
td {
  min-width: 140px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
