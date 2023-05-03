<script setup lang="ts">
import { useSettingStore } from "@/stores/Setting";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { usePagination } from "@/composables/usePagination";

const store = useSettingStore();

const { citiesList } = storeToRefs(useSettingStore());
const { pagination, paginate } = usePagination();

pagination.value.pageSize = 7;

const ids = ref<string[]>([]);
const isDialogVisible = ref(false);
const isLoading = ref(false);
const paginatedList = computed(() => paginate(citiesList.value));
const nameCity = ref("");

store.GetAllCities().then(() => {
  pagination.value.totalCount = citiesList.value.length;
});
function addMoreCity() {
  isLoading.value = true;
  store.UpsertCity({ name: nameCity.value }).then(() => {
    isLoading.value = false;
    nameCity.value = "";
    isDialogVisible.value = false;
  });
}

function delCities() {
  store.DeleteCities(ids.value);
}
function addIdCity(id: string) {
  ids.value.push(id);
}
</script>

<template>
  <VCard>
    <!-- SECTION Table -->
    <div class="px-8 py-4 pb-0 flex justify-between items-center">
      <h4>المدن</h4>

      <VDialog v-model="isDialogVisible" max-width="600">
        <template #activator="{ props }">
          <VBtn v-bind="props"> اضافة </VBtn>
        </template>

        <!-- Dialog close btn -->
        <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

        <!-- Dialog Content -->
        <VCard title="اضافة مدينة">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <label for="order">الاسم المدينة</label>
              </VCol>
              <VCol cols="12">
                <VTextField v-model="nameCity" />
              </VCol>
            </VRow>
          </VCardText>

          <VCardText class="d-flex justify-end flex-wrap gap-3">
            <VBtn variant="tonal" color="secondary" @click="isDialogVisible = false">
              Close
            </VBtn>
            <VBtn :loading="isLoading" @click="addMoreCity"> Save </VBtn>
          </VCardText>
        </VCard>
      </VDialog>
    </div>

    <VTable class="text-no-wrap invoice-list-table px-5">
      <!-- 👉 Table head -->
      <thead>
        <tr>
          <th scope="col">
            <VBtn icon variant="text" color="default" size="x-small" @click="delCities">
              <VIcon icon="mdi-trash-can-outline" :size="22" />
            </VBtn>
          </th>
          <th scope="col">الاسم</th>
          <th scope="col" class="text-center">تاريخ الانشاء</th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr v-for="city in paginatedList" :key="city.id">
          <th id="check" class="text-left">
            <VCheckbox @change="addIdCity(city.id)" />
          </th>
          <!-- 👉 name -->
          <td>{{ city.name }}</td>

          <!-- 👉 dateCreate -->
          <td class="text-center">
            {{ new Date(city.dateCreated).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>

      <!-- 👉 table footer  -->

      <tfoot v-show="!citiesList.length">
        <tr>
          <td colspan="8" class="text-center text-body-1">لايوجد بيانات</td>
        </tr>
      </tfoot>
    </VTable>
    <VPagination
      v-model="pagination.pageIndex"
      class="pb-5 pt-3"
      :length="pagination.totalPages"
      :total-visible="5"
    />

    <!-- !SECTION -->
  </VCard>
</template>
