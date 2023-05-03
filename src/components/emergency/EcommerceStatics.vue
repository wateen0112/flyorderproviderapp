<script setup lang="ts">
const statistics = [
  {
    title: 'عدد المستخدمين',
    stats: '230k',
    icon: 'tabler-chart-pie-2',
    color: 'info'
  },
  {
    title: 'عدد الموظفين',
    stats: '8.549k',
    icon: 'tabler-users',
    color: '#00f',
  },
  {
    title: 'عدد السائقين',
    stats: '1.423k',
    icon: 'tabler:user-circle',
    color: 'error',
  },
  {
    title: 'عدد المطاعم',
    stats: '$9745',
    icon: 'tabler:calendar',
    color: 'success',
  },
]
</script>

<template>
  <VCard title="الاحصاثيات" class="min-h-[216px]">

    <VCardText class="pt-6">
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
              class="me-3"
            >
              <VIcon
                size="24"
                :icon="item.icon"
              />
            </VAvatar>

            <div class="d-flex flex-column">
              <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
              <span class="text-caption">
                {{ item.title }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<style>
.v-card-title{
  font-weight:bold;
}
</style>
