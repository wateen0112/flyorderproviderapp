<script lang="ts" setup>
import AppDateTimePicker from "@core/components/AppDateTimePicker.vue";
import { useOrderStore } from "@/stores/Order";
import type { OrderItem } from "@/api/Order/dto";

const props = defineProps({
  orders: Array as () => OrderItem[],
});

const emit = defineEmits(["filter"]);
const orderStore = useOrderStore();

const { filterDto, orderStatusOptions, pagination, orderFilterParams } =
  storeToRefs(orderStore);

function emitEvent() {
  emit("filter", orderFilterParams);
}
</script>

<template>
  <div>
    <div>
      <div class="grid grid-cols-12 align-center gap-x-2">
        <div class="col-span-2">
          <VSelect
            v-model="filterDto.status"
            label="فلترة : حالة الطلب"
            clearable
            clear-icon="tabler-x"
            item-title="name"
            item-value="value"
            :items="orderStatusOptions"
          />
        </div>
        <div class="col-span-2">
          <div class="flex justify-center items-center">
            <label class="mx-1">من</label>
            <AppDateTimePicker v-model="filterDto.startDate" />
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex justify-center items-center">
            <label class="mx-1">إلى</label>
            <AppDateTimePicker v-model="filterDto.endDate" />
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex justify-center items-center">
            <VTextField
              v-model="filterDto.search"
              append-inner-icon="mdi-search"
              label="ابحث عن طلب معين"
            />
          </div>
        </div>
        <div class="col-span-2">
          <VBtn block append-icon="mdi-filter" @click="emitEvent"> فلترة </VBtn>
        </div>
      </div>
    </div>

    <div class="my-2">
      <VTable density="comfortable" class="text-no-wrap invoice-list-table">
        <!-- 👉 Table head -->
        <thead>
          <tr>
            <th>
              <VCheckbox color="primary" hide-details />
            </th>
            <th scope="col" class="text-center">رقم الطلب</th>
            <th scope="col" class="text-center">اسم الزبون</th>
            <th scope="col" class="text-center">رقم الموبايل</th>
            <th scope="col" class="text-center">العنوان</th>
            <th scope="col" class="text-center">اسم المتجر</th>
            <th scope="col" class="text-center">تاريخ الطلب</th>
            <th scope="col" class="text-center">اسم السائق</th>
            <th scope="col" class="text-center">نوع الطلب</th>
            <th scope="col" class="text-center">حالة الطلب</th>
            <th scope="col" class="text-center">تفاصيل</th>
          </tr>
        </thead>
        <!-- 👉 Table Body -->
        <tr v-for="order in orders" :key="order.id" class="h-16">
          <td>
            <VCheckbox color="primary" class="mr-3" hide-details />
          </td>
          <td class="text-center">
            {{ order.number }}
          </td>
          <td class="text-center">
            {{ order.customerName }}
          </td>
          <td class="text-center">
            {{ order.phoneNumber }}
          </td>
          <td class="text-center">
            {{ order.address.split("-").slice(0, 2).join("/") }}
          </td>
          <td class="text-center">
            <ul
              class="flex rounded flex-col"
              :class="{ border: order.branchNames.length > 1 }"
            >
              <li v-for="shop in order.branchNames" :key="shop" class="p-1">
                {{ shop }}
              </li>
            </ul>
          </td>
          <td class="text-center">
            {{ new Date(order.date).toLocaleString() }}
          </td>
          <td class="text-center">
            {{ order.driverName }}
          </td>
          <td class="text-center">
            {{ order.orderType }}
          </td>
          <td class="text-center">
            {{ order.progress.status }}
          </td>
          <td class="text-center">
            <VBtn
              icon="mdi-dots-vertical"
              size="x-small"
              scope="col"
              class="text-center"
            />
          </td>
        </tr>
        <tbody />
      </VTable>
      <VPagination
        v-model="pagination.pageIndex"
        :length="pagination.totalPages"
        @update:model-value="emitEvent"
      />
    </div>
  </div>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-status {
    inline-size: 11rem;
  }

  .invoice-list-search {
    inline-size: 12rem;
  }
}
</style>
