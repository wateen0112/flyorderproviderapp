<script lang="ts" setup>
import { useAppStore } from '@/stores/App';
import { useInvoiceStore } from '@/stores/Invoice';
import Page from '@/components/shared/Page.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String,
});

const router = useRouter();

const store = useInvoiceStore();

store.GetUnPaidBranchInvoice(props.id);

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
  <div>teest Add Invoice</div>
</template>
