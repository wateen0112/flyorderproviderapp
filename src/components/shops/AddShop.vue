<script lang="ts" setup>
import { VForm } from "vuetify/components";
import { TaxValueType } from "@/enums/Tax";
import { useSettingStore } from "@/stores/Setting";
import { useShopStore } from "@/stores/Shop";
import FileUploader from "../shared/FileUploader.vue";
import WorkTimeInput from "../shared/WorkTimeInput.vue";
import { requiredValidator, lengthValidator } from "@validators";
import { emit } from "process";
import { AddShopWithBranch } from "@/api/Shop/dto";
const props = defineProps({
  isBranch: {
    type: Boolean,
    default: false,
  },
  shopsList: Array,
});
const emit = defineEmits(["close-dialog"]);
const isLoading = ref(false);

const shopForm = ref<InstanceType<typeof VForm>>();
const shopStore = useShopStore();
const settingStore = useSettingStore();
const { addShopDto, shopDetailsDto, shops, shopNames } = storeToRefs(shopStore);

const taxOptions = ref([
  { title: "قيمة ثابتة", value: TaxValueType.Value },
  { title: "نسبة", value: TaxValueType.Rate },
]);
shopStore.GetAllBranches();
function submit() {
  if (shopForm.value) {
    if (props.isBranch == true) {
      shopForm.value.validate().then((result) => {
        isLoading.value = true;
        if (result.valid) {
          isLoading.value = false;
          shopStore
            .AddBranches(addShopDto.value)
            .then(() => {
              new AddShopWithBranch();
              emit("close-dialog");
            })
            .catch(() => (isLoading.value = false));
        }
      });
    } else {
      console.log("in shop add");

      shopForm.value.validate().then((result) => {
        isLoading.value = true;
        if (result.valid) {
          isLoading.value = false;
          shopStore
            .AddNewShop()
            .then(() => {
              new AddShopWithBranch();
              emit("close-dialog");
            })
            .catch(() => (isLoading.value = false));
        }
      });
    }
  }
}
function fillInputData() {
  addShopDto.value.shopId = shopDetailsDto.value.branch.shopId;
  addShopDto.value.categoryId = shopDetailsDto.value.branch.categoryId;
  addShopDto.value.name = shopDetailsDto.value.branch.name;
}

fillInputData();
</script>

<template>
  <VForm ref="shopForm">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <VTextField
        v-if="!isBranch"
        v-model="addShopDto.name"
        :rules="[requiredValidator]"
        label="اسم المتجر"
      />
      <VSelect
        v-else
        v-model="addShopDto.shopId"
        :items="shopNames"
        item-title="shopName"
        item-value="shopId"
        :disabled="isBranch"
        label="اسم المتجر"
      />
      <VSelect
        v-model="addShopDto.categoryId"
        :rules="[requiredValidator]"
        :items="settingStore.shopCategories"
        item-title="name"
        item-value="id"
        label="نوع المتجر"
        :disabled="isBranch"
      />
      <VSelect
        v-model="addShopDto.cityId"
        :rules="[requiredValidator]"
        item-title="name"
        item-value="id"
        label="المحافظة"
        :items="settingStore.citiesList"
      />
      <VSelect
        v-model="addShopDto.labelsIds"
        :rules="[requiredValidator]"
        item-title="name"
        item-value="id"
        label="مايقدمه المتجر"
        :items="settingStore.labels"
      />
      <VTextField
        v-model="addShopDto.branchName"
        :rules="[requiredValidator]"
        label="اسم الفرع"
      />
      <VSelect
        v-model="addShopDto.areaId"
        :rules="[requiredValidator]"
        item-title="name"
        item-value="id"
        label="المنطقة"
        :items="settingStore.areas"
      />
      <VTextField
        v-model="addShopDto.ownerPhoneNumber"
        :rules="[
          requiredValidator,
          lengthValidator(addShopDto.ownerPhoneNumber, 10),
        ]"
        type="number"
        label="رقم صاحب المتجر"
      />
      <VTextField
        v-model="addShopDto.address"
        :rules="[requiredValidator]"
        label="العنوان"
      />
      <VTextField v-model="addShopDto.subscriptionId" label="نوع الاشتراك" />
      <VTextField
        v-model="addShopDto.phoneNumber"
        :rules="[
          requiredValidator,
          lengthValidator(addShopDto.phoneNumber, 10),
        ]"
        type="number"
        label="رقم التواصل"
      />
      <div class="flex items-center gap-2">
        <VTextField
          v-model="addShopDto.tax.value"
          :rules="[requiredValidator]"
          class="w-2/3"
          label="الضريبة"
        />
        <VSelect
          :rules="[requiredValidator]"
          item-title="title"
          label="نوع الضريبة"
          item-value="value"
          class="w-1/3"
          :items="taxOptions"
        />
      </div>

      <div>
        <VLabel>الدفع</VLabel>

        <VRadioGroup
          v-model="addShopDto.autoGenerateInvoice"
          class="flex"
          inline
        >
          <VRadio label="فوري" :value="true" density="compact" />
          <VRadio label="غير فوري" :value="false" density="compact" />
        </VRadioGroup>
      </div>

      <textarea
        v-model="addShopDto.description"
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-500 rounded-lg border borde-gray-300 focus:border-gray-700 focus:outline-none"
        placeholder="الوصف"
      />

      <WorkTimeInput v-model="addShopDto.workTimes" />

      <div>
        <VLabel class="mb-2"> الصورة الرئيسية </VLabel>
        <FileUploader v-model="addShopDto.image.defaultFile" />
      </div>

      <div>
        <VLabel class="mb-2"> الصورة الاضافية </VLabel>
        <!-- {{ addShopDto.image.otherFiles }} -->
        <FileUploader v-model="addShopDto.image.otherFiles" multiple />
      </div>
    </div>
    <div class="actions sticky bottom-0">
      <VBtn
        :rules="[requiredValidator]"
        prepend-icon="mdi-plus"
        class="my-4"
        @click="submit"
        :loading="isLoading"
      >
        إضافة
      </VBtn>
      <VBtn
        :rules="[requiredValidator]"
        color="error"
        prepend-icon="mdi-cancel"
        class="mx-4"
        @click="$emit('close-dialog')"
      >
        تراجع
      </VBtn>
    </div>
  </VForm>
</template>
