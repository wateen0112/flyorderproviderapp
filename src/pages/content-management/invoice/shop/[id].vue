<script lang="ts" setup>
import { useAppStore } from '@/stores/App';
import { useInvoiceStore } from '@/stores/Invoice';
import Page from '@/components/shared/Page.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String,
});

const router = useRouter();

function goToDetails(id: string) {
  router.push(`/content-management/invoice/shop/invoice/${id}`);
}

const store = useInvoiceStore();

store.GetDetailsBranchInvoice(props.id);

const onLoad = () => {
  useAppStore().SetPageMeta({
    breadCrumb: [],
    icon: 'mdi-currency-usd',
    title: 'الفواتير',
  });
};

onLoad();
</script>

<template>
  <Page
    dialog-title="إضافة فاتورة جديدة"
    placeholder="ابحث عن فاتورة معين"
    button-text="فاتورة جديدة"
  >
    <template #action-button>
      <VBtn to="invoice/index.vue">
        فاتورة جديدة
      </VBtn>
    </template>
    <div>
      <VTable class="text-no-wrap invoice-list-table">
        <!-- 👉 Table -->
        <thead>
          <tr>
            <th scope="col">
              رقم الفاتورة
            </th>
            <th scope="col">
              التاريخ
            </th>
            <th scope="col">
            قيمة الفاتورة
            </th>
            <th scope="col">
              تفاصيل
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.DetailsBranshinvoice" :key="item.id">
            <td>
              {{ item.number }}
            </td>
            <td>
              {{ new Date(item.dateCreated).toLocaleDateString() }}
            </td>
            <td>
              {{ item.incoming }}
            </td>
            <td>
              <VBtn icon size="lg" variant="text" @click="goToDetails(item.id)">
                <VIcon>mdi-dots-vertical</VIcon>
              </VBtn>
            </td>
          </tr>
        </tbody>
      </VTable>
    </div>
  </Page>
</template>
