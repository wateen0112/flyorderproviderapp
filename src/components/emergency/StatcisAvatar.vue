<script setup lang="ts" >
const props = defineProps(['title' , 'icon' , 'color','iconColor' ,'number' ]);
</script>
<template>

  <VCol cols="12"  md="3" class="">
    <div class="px-6 py-2 mb-3 inline-flex">
      <div :class="` min-w-[70px] min-h-[70px] flex justify-center  bg-opacity-30 items-center rounded-full bg-[${props.color}] `"><VIcon size="35" :color="props.iconColor">tabler:user</VIcon></div>
    <div class="px-3 flex flex-col justify-center ">
      <h3>{{props.number}}</h3>
      <h5  font-size="1px"> {{ props.title }} </h5>
    </div>
    </div>
    
      </VCol>
      
</template>
