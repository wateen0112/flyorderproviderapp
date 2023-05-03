<script setup lang="ts">
import Page from "@/components/shared/Page.vue";
import { storeToRefs } from "pinia";
import { useRatingStore } from "@/stores/Rating";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/App";
const store = useRatingStore();
const router = useRouter();
const { ratings, filterRate, pagination } = storeToRefs(useRatingStore());
const formRate = ref<InstanceType<typeof Page> | null>(null);
pagination.value.pageSize = 10;

store.GetAllRatings();
const onLoad = () => {
  useAppStore().SetPageMeta({
    breadCrumb: [],
    icon: "tabler-star",
    title: "التقييمات",
  });
};

onLoad();
function goToDetails(id: string) {
  router.push(`/content-management/ratings/${id}`);
}
function closeForm() {
  formRate.value?.closeDialog();
}
function searchRate(e: any) {
  console.log(e);
}
</script>
<template>
  <Page
    ref="formRate"
    placeholder="ابحث عن تقييم معين"
    icon="tabler-star"
    :add="false"
    @update:search="searchRate($event)"
  >
    <div class="mb-5">
      <VRow>
        <VCol cols="12" md="6">
          <div class="flex justify-center items-center w-full">
            <div class="flex justify-center items-center w-full">
              <label class="mx-1">من</label>
              <AppDateTimePicker
                @change="store.GetAllRatings()"
                v-model="filterRate.startDate"
              />
            </div>

            <div class="flex justify-center items-center w-full mr-3">
              <label class="mx-1">إلى</label>
              <AppDateTimePicker
                @change="store.GetAllRatings()"
                v-model="filterRate.endDate"
              />
            </div>
          </div>
        </VCol>
      </VRow>
    </div>
    <VCard>
      <!-- SECTION Table -->

      <VTable class="text-no-wrap invoice-list-table px-5 pt-2">
        <!-- 👉 Table head -->
        <thead>
          <tr>
            <th scope="col">رقم الطلب</th>
            <th scope="col">اسم الزبون</th>
            <th scope="col">رقم الموبايل</th>
            <th scope="col">رقم السائق</th>
            <th scope="col">اسم المتجر</th>
            <th scope="col">حالة الطلب</th>
            <th scope="col">تفاصيل التقييم</th>
          </tr>
        </thead>

        <!-- 👉 Table Body -->
        <tbody>
          <tr v-for="rate in ratings?.customers" :key="rate.id">
            <!-- 👉 number order -->
            <td>{{ rate.number }}</td>
            <!-- 👉 name customer-->
            <td>{{ rate.customerName }}</td>
            <!-- 👉 phonenumber-->
            <td>{{ rate.customerPhoneNumber }}</td>
            <!-- 👉 name driver-->
            <td>{{ rate.driverPhoneNumber }}</td>
            <!-- 👉 branches-->
            <td>{{ rate.branchs.join(",") }}</td>

            <!-- 👉 evalution -->

            <td>
              <VChip :color="rate.isEvaluated ? 'success' : 'error'">{{
                rate.isEvaluated ? "تم التقييم" : "لم يتم التقييم"
              }}</VChip>
            </td>
            <td style="width: 7.5rem" class="text-center">
              <VBtn
                @click="goToDetails(rate.id)"
                icon
                variant="text"
                color="default"
                size="x-small"
              >
                <VIcon icon="mdi-dots-vertical" :size="22" color="primary" />
              </VBtn>
            </td>
          </tr>
        </tbody>

        <!-- 👉 table footer  -->

        <tfoot v-show="!ratings?.customers.length">
          <tr>
            <td colspan="8" class="text-center text-body-1">لايوجد بيانات</td>
          </tr>
        </tfoot>
      </VTable>
      <VPagination
        v-show="ratings?.customers.length != 0"
        class="py-5"
        v-model="pagination.pageIndex"
        :length="pagination.totalPages"
        :total-visible="10"
        @update:model-value="store.GetAllRatings()"
      />
      <!-- !SECTION -->
    </VCard>
  </Page>
</template>
