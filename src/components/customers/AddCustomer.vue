<script lang="ts" setup>
import AppDateTimePicker from '@/@core/components/AppDateTimePicker.vue';
import { useCustomerStore } from '@/stores/Customer';
import { useSettingStore } from '@/stores/Setting';

import { VForm } from 'vuetify/components';
import { emailValidator, requiredValidator } from '@validators';

const emit = defineEmits(['formSubmit']);

const isLoading = ref(false);

const { customerDto } = storeToRefs(useCustomerStore());

const refForm = ref<VForm>();

const settingStore = useSettingStore();

const store = useCustomerStore();

function submit() {
  if (refForm.value?.validate()) {
    isLoading.value = true;
    store.AddCustomer(customerDto.value).then(() => {
      isLoading.value = false;
      emit('formSubmit');
      store.GetAllCustomer();
    });
  }
}
function cancel() {
  emit('formSubmit');
}
</script>

<template>
  <VForm ref="refForm" class="bg-transparent">
    <div class="grid grid-cols-12 gap-x-3 p-5">
      <div class="md:col-span-6 col-span-12">
        <div class="flex">
          <VTextField
            v-model="customerDto.firstName"
            label="الاسم الأول"
            :rules="[requiredValidator]"
          />
          <VTextField
            v-model="customerDto.lastName"
            class="mx-2"
            label="اسم العائلة"
            :rules="[requiredValidator]"
          />
        </div>
        <VSelect
          v-model="customerDto.cityId"
          :items="settingStore.citiesList"
          item-value="id"
          item-title="name"
          class="mt-3"
          label="المحافظة"
          :rules="[requiredValidator]"
        />
        <VTextField
          v-model="customerDto.email"
          :rules="[requiredValidator, emailValidator]"
          class="mt-3"
          label="البريد الإلكتروني"
        />
        <VTextField
          v-model="customerDto.phoneNumber"
          type="number"
          class="mt-3"
          label="رقم الموبايل"
        />
        <AppDateTimePicker
          v-model="customerDto.birthDate"
          class="mt-3"
          label="تاريخ الميلاد "
          :rules="[requiredValidator]"
        />
      </div>
      <div class="md:col-span-6 col-span-12 relative">
        <label class="flex justify-center absolute left-[50%] -top-[25px]">العنوان</label>
        <VTextField
          v-model="customerDto.address.name"
          label="اسم العنوان"
          :rules="[requiredValidator]"
        />
        <VSelect
          v-model="customerDto.address.cityId"
          :items="settingStore.cityWithArea"
          item-value="id"
          item-title="name"
          class="mt-3"
          label="المدينة"
          :rules="[requiredValidator]"
        />
        <VSelect
          v-model="customerDto.address.areaId"
          :items="
            settingStore.cityWithArea.find((el) => el.id === customerDto.address.cityId)
              ?.areas
          "
          item-value="id"
          item-title="name"
          class="mt-3"
          label="المنطقة"
          :rules="[requiredValidator]"
        />

        <div
          v-if="
            settingStore.cityWithArea
              .find((el) => el.id === customerDto.address.cityId)
              ?.areas.find((ar) => ar.id === customerDto.address.areaId)?.name
            === 'سكن جامعي'
          "
        >
          <VTextField
            v-model="customerDto.address.dormitoryAddress.numberNum"
            type="number"
            class="mt-3"
            label="رقم الوحدة"
            :rules="[requiredValidator]"
          />
          <VTextField
            v-model="customerDto.address.dormitoryAddress.roomNum"
            type="number"
            class="mt-3"
            label="رقم الغرفة "
            :rules="[requiredValidator]"
          />
        </div>
        <div
          v-if="
            settingStore.cityWithArea
              .find((el) => el.id === customerDto.address.cityId)
              ?.areas.find((ar) => ar.id === customerDto.address.areaId)?.name
            !== 'سكن جامعي'
          "
        >
          <VTextField
            v-model="customerDto.address.residentialAddress.street"
            class="mt-3"
            label=" الشارع"
            :rules="[requiredValidator]"
          />
          <VTextField
            v-model="customerDto.address.residentialAddress.building"
            class="mt-3"
            label=" البناء "
            :rules="[requiredValidator]"
          />

          <VTextField
            v-model="customerDto.address.residentialAddress.floor"
            class="mt-3"
            label=" الطابق"
            type="number"
            :rules="[requiredValidator]"
          />
          <VTextField
            v-model="customerDto.address.residentialAddress.details"
            class="mt-3"
            label=" تفاصيل إضافية"
            :rules="[requiredValidator]"
          />
        </div>
      </div>
    </div>

    <VDivider />
    <div class="mt-3 flex">
      <VBtn
        variant="flat"
        color="primary"
        class="m-2 text-white"
        :loading="isLoading"
        @click="submit"
        >
          إضافة
      </VBtn>
      <VBtn variant="outlined" color="primary" class="m-2" @click="cancel">
        تراجع
      </VBtn>
    </div>
  </VForm>
</template>
