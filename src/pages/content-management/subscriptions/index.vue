<script lang="ts" setup>
import SubscriptionsTable from '@/components/subscriptions/SubscriptionsTable.vue';
import {useSubStore} from '@/stores/Subsecrption';
const store = useSubStore();
onBeforeMount(() => {
  store.getAll();
})
</script>
<template>

<SubscriptionsTable/>
</template>
