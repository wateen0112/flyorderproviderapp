<script setup lang="ts">
import FileUploader from "@/components/shared/FileUploader.vue";
import Input from "@/components/input/Addrow.vue";
import { useProductStore } from "@/stores/Product";
import { useShopStore } from "@/stores/Shop";
import { integerValidator, requiredValidator } from "@validators";

const props = defineProps({
  dialogTitle: {
    type: String,
    default: "منتج جديد",
  },
  icon: {
    type: String,
    default: "tabler-album",
  },
});

type list = {
  name: string;
  price: number;
};
const store = useProductStore();
const storeSetting = useShopStore();
const extraDto = ref<list>({
  name: "",
  price: 0,
});
const { addProductDto } = storeToRefs(useProductStore());
const { shopDetailsDto } = storeToRefs(useShopStore());
function addProduct() {}
function addExtraProd() {
  if (extraDto.value.name != "" && extraDto.value.price != 0)
    addProductDto.value.productsExtraItems.unshift({
      name: extraDto.value.name,
      price: extraDto.value.price,
    });
}

function removeExtraPro(id: any) {
  addProductDto.value.productsExtraItems =
    addProductDto.value.productsExtraItems.filter((ele, indx) => indx != id);
  console.log(id);
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="6">
      <VTextField
        :rules="[requiredValidator]"
        v-model="addProductDto.name"
        label="اسم المنتج"
      />
    </VCol>

    <VCol cols="12" md="6">
      <VSelect
        :items="shopDetailsDto.branch.categories"
        v-model="addProductDto.categoryId"
        item-title="name"
        item-value="id"
        label="التصنيف"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        :rules="[requiredValidator, integerValidator]"
        v-model="addProductDto.calories"
        label="السعرات الحرارية"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        :rules="[requiredValidator, integerValidator]"
        v-model="addProductDto.price"
        label=" السعر"
      />
    </VCol>

    <VCol cols="12" md="6">
      <label>الصورة الاساسية</label>
      <FileUploader v-model="addProductDto.image.defaultFile" class="mt-5" />
    </VCol>

    <VCol cols="12" md="6">
      <span> الصور الفرعية</span>
      <FileUploader
        class="mt-5"
        v-model="addProductDto.image.otherImagesFiles"
        multiple
      />
    </VCol>

    <VCol cols="12" md="6">
      <VLabel class="mb-5">اضافة المنتج</VLabel>

      <VRow>
        <VCol cols="12" md="5">
          <VTextField v-model="extraDto.name" label=" اسم المنتج" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="extraDto.price" label=" السعر" />
        </VCol>
        <VCol cols="12" md="2">
          <VBtn variant="text" color="success" @click="addExtraProd">
            اضافة
          </VBtn>
        </VCol>
      </VRow>

      <VRow>
        <VCol
          v-for="(prodExtra, i) in addProductDto.productsExtraItems"
          :key="i"
          cols="12"
          class="bg-gray-100 rounded flex justify-between items-center w-full mt-2"
        >
          <strong>{{ prodExtra.name }}</strong>
          <div>
            <span class="ml-4">{{ prodExtra.price }} ل.س</span>

            <VBtn
              @click="removeExtraPro(i)"
              icon
              variant="text"
              color="default"
              size="x-small"
            >
              <VIcon icon="mdi-close" :size="22" color="error" />
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="12" md="6">
      <textarea
        v-model="addProductDto.description"
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-500 rounded-lg border borde-gray-300 focus:border-gray-700 focus:outline-none"
        placeholder="وصف المتجر"
      />
      <div class="mt-4">
        <VLabel>حالة المنتج</VLabel>
        <VRadioGroup v-model="addProductDto.isAvailable" class="flex" inline>
          <VRadio label="متوفر" :value="true" />
          <VRadio label="غير متوفر" :value="false" />
        </VRadioGroup>
      </div>
    </VCol>
  </VRow>
</template>
