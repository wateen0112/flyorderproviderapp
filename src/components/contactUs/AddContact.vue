<script lang="ts" setup>
import { AddContactDto } from "@/api/ContactUs/dto";
import { useContactStore } from "@/stores/contactUs";
import { useCustomerStore } from "@/stores/Customer";
import { useOrderStore } from "@/stores/Order";
import { VForm } from "vuetify/components";
import { requiredValidator, integerValidator, lengthValidator } from "@validators";
import FileUploader from "../shared/FileUploader.vue";

const tempDto = new AddContactDto();
const dto = reactive(tempDto);
const store = useContactStore();
const isloading = ref(false);
const customerStore = useCustomerStore();
const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);
const { CustomerList } = storeToRefs(customerStore);
const emit = defineEmits(["dialog"]);
const refVForm = ref<InstanceType<typeof VForm>>();

const errors = ref<Record<string, string | undefined>>({
  customerId: undefined,

  title: undefined,
  content: undefined,
});
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
});
const submit = () => {
  refVForm.value?.validate().then((result) => {
    if (result.valid) {
      store.addContact(dto).then(() => {
        emit("dialog");
      });
    }
  });
};
onBeforeMount(() => {
  customerStore.GetAllCustomer();
  // productsStore.Get
});
</script>

<template>
  <VForm class="min-h-[400px]" ref="refVForm">
    <div class="grid lg:grid-cols-2 grid-col-1 gap-3">
      <div class="col">
        <VAutocomplete
          :items="CustomerList"
          item-title="name"
          item-value="id"
          label=" ID حساب الزبون "
          v-model="dto.customerId"
          :rules="[requiredValidator]"
          :error-messages="errors.customerId"
        />
      </div>

      <div class="col">
        <VTextField
          label=" العنوان   "
          v-model="dto.title"
          :rules="[requiredValidator]"
          :error-messages="errors.title"
        />
      </div>
      <div class="col">
        <VTextarea
          filled
          class="mt-10"
          label=" الوصف   "
          :rules="[requiredValidator]"
          :error-messages="errors.content"
          v-model="dto.content"
        />
      </div>
      <div class="col lg:mt-0 mt-5">
        <VAutocomplete
          :items="orders"
          item-title="name"
          item-value="id"
          label=" ID الطلب  "
          v-model="dto.orderId"
        />
      </div>

      <div class="col mt-12">
        <label class="my-3"> إضافة صورة</label>
        <FileUploader class="" v-model="dto.imageFile" />
      </div>
    </div>
    <div class="mt-14 mx-5 mb-6 sticky bottom-5">
      <VBtn class="mx-5" :loading="isloading" @click="submit">إضافة شكوى</VBtn>
      <VBtn color="primary" @click="$emit('dialog')" variant="outlined">
        <VIcon>tabler:table-import</VIcon> تراجع</VBtn
      >
    </div>
  </VForm>
</template>
