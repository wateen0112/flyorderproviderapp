<script lang="ts" setup>
import Page from '@/components/shared/Page.vue';
import { useCustomerStore } from '@/stores/Customer';
import { useSettingStore } from '@/stores/Setting';
import { useRouter } from 'vue-router';
import Address from '@/components/address/index.vue';

const props = defineProps({
  id: String,
});

const isDialogVisible = ref(false);

const router = useRouter();

const { customerDetailsDto } = storeToRefs(useCustomerStore());

const settingStore = useSettingStore();

const store = useCustomerStore();

store.GetDetailsCustomer(props.id);

function modifyCus() {
  store
    .ModifyCustomer({ ...customerDetailsDto.value, id: props.id })
    .then(() => router.go(-1));
}

function deleteCus() {
  if (props && props.id)
  store.DeleteCustomer([props.id]).then(() => router.go(-1));
}
</script>

<template>
  <Page :add='false' :has-search='false'>
    <template #action-button>
      <div class="flex justify-center items-center gap-3">
        <VBtn variant="tonal" color="primary" @click="modifyCus"> تعديل </VBtn>
        <VBtn variant="tonal" color="error" @click="deleteCus"> حذف </VBtn>

        <VBtn variant="outlined" color="primary" @click="$router.go(-1)"> تراجع </VBtn>
      </div>
    </template>
    <div class="costumer-details">
      <!-- Details Customer -->
      <VCard prepend-icon="mdi-user-circle" class="rounded shadow-lg border">
        <template #title> تفاصيل الزبون </template>
        <VForm class="grid lg:grid-cols-3 grid-cols-12 gap-5 p-5">
          <div class="lg:col-span-2 grid lg:grid-cols-2 gap-5 col-span-12 grid-cols-12">
            <div class="lg:col-span-1 col-span-12">
              <div class="md:col-span-4 col-span-12 flex">
                <VTextField v-model="customerDetailsDto.firstName" label="الاسم الأول" />
                <VTextField
                  v-model="customerDetailsDto.lastName"
                  label="اسم العائلة"
                  class="mx-2"
                />
              </div>
              <div class="md:col-span-4 col-span-12 mt-2">
                <VSelect
                  v-model="customerDetailsDto.cityId"
                  item-value="id"
                  item-title="name"
                  :items="settingStore.citiesList"
                  label="المحافظة"
                />
              </div>
            </div>
            <div class="lg:col-span-1 col-span-12">
              <div class="md:col-span-4 col-span-12">
                <VTextField
                  v-model="customerDetailsDto.phoneNumber"
                  label=" رقم الموبايل"
                />
              </div>
              <div class="md:col-span-4 col-span-12 mt-2">
                <VTextField
                  v-model="customerDetailsDto.email"
                  label="البريد الإلكتروني"
                />
              </div>
            </div>
          </div>
          <div class="lg:col-span-1 col-span-12">
            <div class="md:col-span-4 col-span-12">
              <AppDateTimePicker
                v-model="customerDetailsDto.birthDate"
                label=" المواليد (اختياري)"
              />
            </div>
          </div>
        </VForm>
      </VCard>
      <!-- Details Address -->
      <div class="mt-6">
        <Address />
      </div>
    </div>
  </Page>
</template>

<style>
.v-card-item {
  padding: 0 !important;
}
</style>
