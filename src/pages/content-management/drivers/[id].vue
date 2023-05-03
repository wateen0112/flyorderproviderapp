<script lang="ts" setup>
import FileUploader from "@/components/shared/FileUploader.vue";
import WorkTimeInput from "@/components/shared/WorkTimeInput.vue";
import {
  emailValidator,
  requiredValidator,
  integerValidator,
  lengthValidator,
  regexValidator,
} from "@validators";
import { VForm } from "vuetify/components";
import { useDriverStore } from "@/stores/Driver";
import { useFile } from "@/composables";
import { useSettingStore } from "@/stores/Setting";

import Page from "@/components/shared/Page.vue";
import { BooldType, GetDriverByIdDto } from "@/api/Driver/dto";
import { PaymentValueType } from "@/api/Driver/dto";
import OrdersTable from "@/components/orders/OrdersTable.vue";
let phoneNumberErrors = <any>[];
const store = useDriverStore();
const { getDriverByIdDto } = storeToRefs(store);
const { getFileUrl } = useFile();
const refVForm = ref<InstanceType<typeof VForm>>();
const settingStore = useSettingStore();
const { citiesList } = storeToRefs(settingStore);
const isLoading = ref(false);

const props = defineProps(["id"]);
const bloodType = [
  BooldType.ANegative,
  BooldType.APositive,
  BooldType.AbNegative,
  BooldType.AbPositive,
  BooldType.BNegative,
  BooldType.BPositive,
  BooldType.ONegative,
  BooldType.OPositve,
];

const errors = ref<Record<string, string>>({
  name: "",

  phoneNumber: phoneNumberErrors,
  ordersCount: "",
  dateCreated: "",
  address: "",
  telegramUserName: "",
  docsImage: "",
  docsUrl: "",
  imageFile: "",
  birthDate: "",
  imageUrl: "",
  profitType: "",
  profit: "",
  cityName: "",
  cityId: "",
  email: "",
  bloodType: "",
});

const addNewPhoneNumber = () => {
  getDriverByIdDto.value.driver.phoneNumbers.push("");
  phoneNumberErrors.push("");
};

let docsUrlToDelete = <any>[];
const addDocsToDeleteList = (url: string) => {
  getDriverByIdDto.value.driver.docsUrl = getDriverByIdDto.value.driver.docsUrl.filter(
    (item: string) => {
      return item !== url;
    }
  );
  docsUrlToDelete.push(url);
};
const submit = () => {
  if (refVForm.value)
    refVForm.value.validate().then((result) => {
      if (result.valid) {
        let f = 0;
        getDriverByIdDto.value.driver.phoneNumbers.forEach(
          (element: any, index: number) => {
            const phoneNumberPrefix = element.slice(0, 2);
            if (phoneNumberPrefix === "09") {
              f++;
              phoneNumberErrors[index] = "";
            } else {
              phoneNumberErrors[index] = "phone number must start with 09";
            }
            if (f === getDriverByIdDto.value.driver.phoneNumbers.length) {
              getDriverByIdDto.value.driver.docsUrlToDelete = docsUrlToDelete;
              isLoading.value = true;
              store.modify().then(() => {
                isLoading.value = false;
              });
            }
          }
        );
      }
    });
};
onBeforeMount(() => {
  store.getById(props.id);
});
onBeforeUnmount(() => {
  getDriverByIdDto.value = new GetDriverByIdDto();
});
const removePhoneNumebr = (i: number) => {
  if (i !== 0) {
    phoneNumberErrors = phoneNumberErrors.filter((item: any, index: number) => {
      return index !== i;
    });
    getDriverByIdDto.value.driver.phoneNumbers = getDriverByIdDto.value.driver.phoneNumbers.filter(
      (item: any, index: number) => {
        return index !== i;
      }
    );
  }
};
</script>

<template>
  <Page :has-search="false">
    <template #action-button>
      <div class="flex justify-center items-center gap-3">
        <VBtn :loading="isLoading" variant="tonal" color="primary" @click="submit">
          تعديل
        </VBtn>
        <VBtn variant="tonal" color="error" @click="store.deleteDrivers([props.id])">
          حذف
        </VBtn>

        <VBtn variant="outlined" color="primary" @click="$router.go(-1)"> تراجع </VBtn>
      </div>
    </template>
    <VForm ref="refVForm">
      <VRow>
        <VCol cols="12" md="12">
          <VCard class="mt-5">
            <VCardText class="d-flex mb-5">
              <h3><VIcon class="text-primary">tabler-car</VIcon> تفاصيل السائق</h3>
            </VCardText>

            <!--     dammmmmm-->

            <VRow>
              <VCol cols="12" md="6" align="center">
                <h3 class="text-right px-5 hidden lg:block font-light">صورة السائق</h3>
                <img
                  class="object-cover min-h-[200px] w-[200px] rounded-full my-3"
                  :src="getFileUrl(getDriverByIdDto.driver.imageUrl)"
                />

                <div class="p-5 flex flex-col gap-5">
                  <span class="sm:text-center lg:text-right">تعديل صورة السائق</span>

                  <FileUploader v-model="getDriverByIdDto.driver.imageFile" />
                </div>

                <div class="p-5 flex flex-col gap-5">
                  <span class="sm:text-center lg:text-right">تعديل وثائق السائق</span>

                  <FileUploader
                    :multiple="true"
                    v-model="getDriverByIdDto.driver.docsFiles"
                  />
                </div>
              </VCol>

              <VCol cols="12" md="6" align="center">
                <h3 class="mb-5 text-right px-5 lg:block font-light">وثائق السائق</h3>
                <div class="max-h-[600px] overflow-y-auto min-h-[100px]">
                  <h3
                    class="bg-primary mx-5 opacity-50 py-10 rounded-md shadow-lg"
                    v-if="getDriverByIdDto.driver.docsUrl.length === 0"
                  >
                    لا يوجد وثائق
                  </h3>
                  <div class="relative" v-for="item in getDriverByIdDto.driver.docsUrl">
                    <span
                      color="primary"
                      class="text-white bg-red-500 p-2 absolute top-3 left-15 hover:opacity-50"
                      @click="addDocsToDeleteList(item)"
                    >
                      <VIcon>mdi-close</VIcon></span
                    >
                    <a target="_blank" :href="getFileUrl(item)">
                      <img
                        class="min-h-[300px] w-[400px] object-cover my-3"
                        :src="getFileUrl(item)"
                      />
                    </a>
                  </div>
                </div>
              </VCol>
            </VRow>
            <!--dammmm-->
            <VDivider />

            <VCardText class="pt-2">
              <!-- 👉 Form -->
              <div class="mt-6" inheritAttrs="getDriverByIdDto.driver">
                <VRow>
                  <!-- 👉 Drvier name  -->
                  <VCol md="6" cols="12">
                    <VTextField
                      v-model="getDriverByIdDto.driver.name"
                      label="اسم السائق"
                      :rules="[requiredValidator]"
                      :error-messages="errors.name"
                    />
                  </VCol>

                  <!-- 👉 Birthdate -->
                  <VCol md="6" cols="12">
                    <AppDateTimePicker
                      clearable
                      v-model="getDriverByIdDto.driver.birthDate"
                      :rules="[requiredValidator]"
                      :error-messages="errors.birthDate"
                      label="تاريخ الميلاد"
                    />
                  </VCol>

                  <!-- 👉 Telegram -->
                  <VCol cols="12" md="6">
                    <VTextField
                      label="حساب التيليغرام"
                      type="text"
                      v-model="getDriverByIdDto.driver.telegramAccount.userName"
                      :rules="[requiredValidator]"
                      :error-messages="errors.telegramAccount"
                    />
                  </VCol>
                  <!-- 👉 Email -->
                  <VCol cols="12" md="6">
                    <VTextField
                      v-model="getDriverByIdDto.driver.email"
                      :rules="[requiredValidator, emailValidator]"
                      :error-messages="errors.email"
                      label="البريد الالكتروني"
                      type="email"
                    />
                  </VCol>
                  <!-- 👉 Phone -->

                  <!-- 👉 Address -->
                  <VCol cols="12" md="6">
                    <VTextField
                      label="العنوان"
                      v-model="getDriverByIdDto.driver.address"
                      :rules="[requiredValidator]"
                      :error-messages="errors.address"
                    />
                  </VCol>

                  <!-- 👉 State -->
                  <VCol cols="12" md="6">
                    <VSelect
                      label="المحافظة"
                      v-model="getDriverByIdDto.driver.cityId"
                      :rules="[requiredValidator]"
                      :error-messages="errors.cityId"
                      clearable
                      item-title="name"
                      item-value="id"
                      :items="citiesList"
                    />
                  </VCol>
                  <VCol cols="12" md="6">
                    <div class="w-full flex gap-2 flex-row justify-end"></div>
                    <div
                      v-for="(item, index) in getDriverByIdDto.driver.phoneNumbers"
                      :key="index"
                    >
                      <VTextField
                        :class="index !== 0 ? 'my-2' : ''"
                        @click:append-inner="addNewPhoneNumber()"
                        v-model="getDriverByIdDto.driver.phoneNumbers[index]"
                        append-inner-icon="mdi-add"
                        append-inner-icon-color="primary"
                        :append-icon="index !== 0 ? 'mdi-minus' : ''"
                        @click:append="removePhoneNumebr(index)"
                        label="رقم الموبايل"
                        :rules="[
                          requiredValidator,
                          integerValidator,
                          lengthValidator(
                            getDriverByIdDto.driver.phoneNumbers[index],
                            10
                          ),
                          regexValidator(
                            getDriverByIdDto.driver.phoneNumbers[index],
                            /[09].[^1702]{1}[0-9]{7}/
                          ),
                        ]"
                        :error-messages="errors.phoneNumber[index]"
                      >
                      </VTextField>
                    </div>
                  </VCol>
                  <!-- 👉 bloodType   -->
                  <VCol cols="12" md="6">
                    <VSelect
                      label="زمرة الدم"
                      clearable
                      v-model="getDriverByIdDto.driver.bloodType"
                      :rules="[requiredValidator]"
                      :error-messages="errors.blood"
                      :items="bloodType"
                    />
                  </VCol>
                  <VCol cols="12" md="6">
                    <div class="px-5 py-8">
                      <VLabel>ربح السائق</VLabel>

                      <VRadioGroup
                        v-model="getDriverByIdDto.driver.payment.valueType"
                        class="flex"
                        inline
                      >
                        <VRadio
                          label="نسبة"
                          checked
                          :value="PaymentValueType.Rate"
                          density="compact"
                        />
                        <VRadio
                          label="مبلغ نقدي"
                          :value="PaymentValueType.Value"
                          density="compact"
                        />

                        <VTextField
                          :prefix="
                            getDriverByIdDto.driver.payment.valueType === 'Rate'
                              ? '%'
                              : ''
                          "
                          class="mx-5"
                          v-model="getDriverByIdDto.driver.payment.value"
                          :rules="[requiredValidator]"
                          :error-messages="errors.profit"
                        />
                      </VRadioGroup></div
                  ></VCol>

                  <!-- 👉 Form Actions -->
                </VRow>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <div class="my-3 px-5">
            <WorkTimeInput v-model="getDriverByIdDto.driver.workTime" />
          </div>
        </VCol>
      </VRow>
      <VCol cols="12" md="12">
        <OrdersTable />
      </VCol>
    </VForm>
  </Page>
</template>
<style>
.v-field__append-inner {
  color: orange;
}
.v-input__append {
  color: red;
}
.flatpickr-input {
  box-shadow: none;
}
</style>
