<script lang="ts" setup>
import AddAds from '@/components/adsPage/addAds.vue';
import Addproduct from '@/components/products/AddProduct.vue';
import Page from '@/components/shared/Page.vue';
import { useAppStore } from '@/stores/App';

const pageRef = ref<InstanceType<typeof Page> | null>(null);

const onLoad = () => {
  useAppStore().SetPageMeta({
    breadCrumb: [],
    icon: 'tabler-star',
    title: 'الاعلانات',
  });
};

onLoad();
function goToDetails() {
  pageRef.value?.openDialog();
}
function searchAds(Ads: any) {
  console.log(Ads);
}
</script>

<template>
  <Page
    ref="pageRef"
    dialog-title="  إضافة الاعلان"
    button-text="إعلان جديد"
    icon="tabler-star"
    placeholder="ابحث عن إعلان محدد"
    @update:search="searchAds($event)"
  >
    <template #dialog-form>
      <AddAds />
    </template>

    <div class="my-6">
      <VTable class="text-no-wrap invoice-list-table">
        <thead class=" ">
          <tr>
            <th scope="col">
              رقم الاعلان
            </th>
            <th scope="col">
              اسم الاعلان
            </th>
            <th scope="col">
              تابع للمتجر
            </th>
            <th scope="col">
              تاريخ بداية الاعلان
            </th>
            <th scope="col">
              تاريخ انتهاء الاعلان
            </th>
            <th scope="col">
              كود العرض
            </th>
            <th scope="col">
              تفاصيل
            </th>
          </tr>
        </thead>
        <tbody class="mt-3">
          <tr class="">
            <td>1</td>
            <td>الاشتراك الذهبي</td>
            <td>ماريو _الفرع الرئيسي</td>
            <td>2020-02-02 (12:45PM)</td>
            <td>2020-02-02 (12:45PM)</td>
            <td>202</td>
            <td>
              <VBtn icon size="md" variant="text" @click="goToDetails">
                <VIcon>mdi-dots-vertical</VIcon>
              </VBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>ماريو _الفرع الرئيسي</td>
            <td>الاشتراك الذهبي</td>
            <td>2020-02-02 (12:45PM)</td>
            <td>2020-02-02 (12:45PM)</td>
            <td>202</td>
            <td>
              <VBtn icon size="md" variant="text" @click="goToDetails">
                <VIcon>mdi-dots-vertical</VIcon>
              </VBtn>
            </td>
          </tr>
          <tr>
            <Addproduct>addd</Addproduct>
          </tr>
        </tbody>
      </VTable>
    </div>
    <div class="d-flex items-center flex-wrap justify-center p-4">
      <span class="text-sm text-disabled" />
      <VPagination :length="4" rounded="circle" />
    </div>
  </Page>
</template>
