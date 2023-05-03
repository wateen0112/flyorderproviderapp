<script setup lang="ts">
import { useFile } from "@/composables";
import { useContactStore } from "@/stores/ContactUs";

import { ReplyDto } from "@/api/ContactUs/dto";
const store = useContactStore();

const isloading = ref(false);
const { getFileUrl } = useFile();
const props = defineProps(["id"]);

const { contactDto } = storeToRefs(store);
const rep = new ReplyDto();
const reply = reactive(rep);
onBeforeMount(() => {
  isloading.value = true;
  store.getyId(props.id).then(() => {
    isloading.value = false;
  });
  // empStore.GetAllEmployee();
});

reply.id = props.id;
</script>

<template>
  <VForm ref="refVForm" class="mt-5">
    <VCard class="">
      <VCardText>
        <VCardTitle
          ><VIcon color="primary">tabler-clipboard-text</VIcon> تفاصيل الشكوى</VCardTitle
        >
      </VCardText>
      <VCardText>
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <div class="col">
            <div class="">
              <h5 class="text-md">رقم الشكوى / الاقتراح</h5>
              <p class="my-2">{{ contactDto.number }}</p>
            </div>
            <div class="my-5">
              <h5 class="text-md">البريد الالكتروني</h5>
              <p class="my-2">
                {{
                  contactDto.customerEmail === null ? "لا يوجد" : contactDto.customerEmail
                }}
              </p>
            </div>
            <div class="my-5">
              <h5 class="text-md">رقم الموبايل</h5>
              <p class="my-2">{{ contactDto.customerPhoneNumber }}</p>
            </div>
          </div>

          <div class="col">
            <div class="">
              <h5 class="text-md">رقم الطلب التابع لها</h5>
              <p class="my-2">
                {{ contactDto.orderNumber === null ? "لايوجد" : contactDto.orderNumber }}
              </p>
            </div>
            <div class="mt-5">
              <h5 class="text-md">التاريخ</h5>
              <p class="my-2">
                {{ contactDto.dateCreated === "" ? "لا يوجد" : contactDto.dateCreated }}
              </p>
            </div>

            <h5 class="text-md">اسم صاحب الشكوى / الاقتراح</h5>
            <p class="my-2">{{ contactDto.customerName }}</p>
          </div>

          <div
            v-if="contactDto.imageUrl"
            class="w-full flex justify-center items-center col"
          >
            <img
              class="w-full object-cover shadow-md rounded-sm"
              :src="getFileUrl(contactDto.imageUrl)"
              alt=""
            />
          </div>

          <div class="lg:col-span-3">
            <h5 class="text-md mt-2">عنوان الشكوى (الاقتراح)</h5>
            <p class="my-2">{{ contactDto.title }}</p>
            <h5 class="text-md">نص الشكوى (الاقتراح)</h5>
            <p class="" value="">{{ contactDto.content }}</p>
          </div>
          <div class="col mb-3" v-if="!contactDto.reply">
            <h5 class="text-md">الرد على الرسالة (الاقتراح)</h5>

            <VTextarea class="my-12" v-model="reply.reply"></VTextarea>
          </div>

          <div v-else>
            <h5 class="text-md my-5">الرد على الرسالة (الاقتراح)</h5>

            <p class="text-lg font-semibild">{{ contactDto.reply }}</p>
            <div
              v-if="contactDto.repliedDashUserName !== null"
              class="mt-5 flex flex-col gap-3"
            >
              <span>اسم الموظف صاحب الرد </span>
              <div class="flex justify-start items-center gap-3">
                <img
                  class="w-[24px] h-[24px] rounded-full"
                  :src="getFileUrl(contactDto.repliedDashUserImageUrl)"
                  alt=""
                />
                <label>{{ contactDto.repliedDashUserName }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex justify-start mt-5 col-span-3">
          <VBtn
            :loading="isloading"
            :disabled="contactDto.reply !== null"
            @click="store.replyOnContact(reply)"
            >إرسال</VBtn
          >
          <VBtn @click="$router.go(-1)" variant="outlined" color="primary" class="mx-5">
            رجوع
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VForm>
</template>
