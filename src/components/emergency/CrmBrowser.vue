<script setup lang="ts">

import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'
import avatar6 from '@/assets/images/avatars/avatar-6.png'

const browserStates = [
  {
    avatarImg: avatar2,
    title: 'Google avatar2',
    stats: '90.4',
    progress: 'secondary',
  },
  {
    avatarImg: avatar6,
    title: 'Apple avatar6',
    stats: '70.6',
    progress: 'success',
  },
  {
    avatarImg: avatar3,
    title: 'Mozilla avatar3',
    stats: '35.5',
    progress: 'primary',
  },
  {
    avatarImg: avatar5,
    title: 'Opera Mini',
    stats: '80.0',
    progress: 'error',
  },
  {
    avatarImg: avatar4,
    title: 'Internet Explorer',
    stats: '62.2',
    progress: 'info',
  },
  {
    avatarImg: avatar1,
    title: 'avatar1',
    stats: '46.3',
    progress: 'warning',
  },
]
</script>

<template>
  <VCard
    title="السائقين الأكثر انجازا "
   
  >
  
    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="state in browserStates"
          :key="state.title"
        >
          <template #prepend>
            <VAvatar
              size="28"
              :image="state.avatarImg"
            />
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ state.title }}
          </VListItemTitle>

          <template #append>
            <span class="font-weight-medium text-medium-emphasis me-3">{{ state.stats }}%</span>
            <VProgressCircular
              :model-value="state.stats"
              :color="state.progress"
              width="3"
            />
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 30px;
}
</style>
