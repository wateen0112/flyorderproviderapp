<script setup lang="ts">
import Page from '@/components/shared/Page.vue';
import { requiredValidator } from '@validators';
import { VForm } from 'vuetify/components';

const now = new Date();
const currentMonth = now.toLocaleString('default', { month: '2-digit' });
const currentYear = now.getFullYear();
const date = ref('');
const date1 = ref('');
const insetSwitch = ref(false);
const refForm = ref<VForm>();
</script>

<template>
  <Page :add="false" :has-search="false">
    <template #action-button>
      <div class="flex justify-center items-center gap-3">
        <VBtn
          variant="tonal"
          color="primary"
          type="submit"
          @click="refForm?.validate()"
        >
          تعديل
        </VBtn>
        <VBtn variant="outlined" color="error">
          حذف
        </VBtn>
        <VBtn variant="tonal" color="error">
          تراجع
        </VBtn>
      </div>
    </template>
    <div>
      <VForm ref="refForm" @submit.prevent="() => {}">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 m-2">
          <div>
            <div>
              <VLabel>اسم الاعلان </VLabel>
              <VTextField label="اسم الاعلان " :rules="[requiredValidator]" />
            </div>
            <div class="mt-6">
              <VLabel>تاريخ بدايةالاعلان</VLabel>
              <AppDateTimePicker
                v-model="date"
                label="تاريخ بداية الاعلان"
                :rules="[requiredValidator]"
                :config="{
                  dateFormat: 'Y-m-d',
                  disable: [
                    {
                      from: `${currentYear}-${currentMonth}-20`,
                      to: `${currentYear}-${currentMonth}-25`,
                    },
                  ],
                }"
              />
            </div>
            <div class="mt-6">
              <VLabel>الاعلان تابع ل</VLabel>
              <div class="flex">
                <label class="mt-4 mx-3">مسؤولين النظام</label>
                <VSwitch v-model="insetSwitch" inset label="المتاجر" />
              </div>
            </div>
            <div>
              <VLabel>اسم المتجر </VLabel>
              <VTextField label="اسم المتجر " :rules="[requiredValidator]" />
            </div>
          </div>
          <div>
            <div class="lg:mx-4">
              <VLabel>تاريخ انتهاءالاعلان</VLabel>
              <AppDateTimePicker
                v-model="date1"
                label="تاريخ انتهاءالاعلان"
                :rules="[requiredValidator]"
                :config="{
                  dateFormat: 'Y-m-d',
                  disable: [
                    {
                      from: `${currentYear}-${currentMonth}-20`,
                      to: `${currentYear}-${currentMonth}-25`,
                    },
                  ],
                }"
              />
            </div>
            <div class="mt-6 lg:mx-4">
              <VLabel> كود العرض </VLabel>
              <VTextField label=" كود العرض " :rules="[requiredValidator]" />
            </div>
          </div>
          <div class="w-[100%] lg:h-[300px] mb-[100px] lg:mb-6">
            <div class="md:col-span-4 col-span-12">
              <label class="text-sm p-2">صورة الاعلان</label>
              <div class="position-relative">
                <VMenu>
                  <template #activator="{ props }">
                    <VBtn
                      class="position-absolute"
                      style="top: 5px; left: 3"
                      size="x-small"
                      icon="mdi-dots-vertical"
                      v-bind="props"
                    />
                  </template>
                  <VList class="flex flex-col">
                    <VBtn variant="outlined" class="m-2">
                      تعديل الصورة
                    </VBtn>
                  </VList>
                </VMenu>
                <img src="" class="w-full rounded h-[300px] object-cover">
              </div>
            </div>
          </div>
        </div>
      </VForm>
    </div>
  </Page>
</template>
