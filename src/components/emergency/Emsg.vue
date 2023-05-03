<template>

    <VCardText class="mb-10">
    <VRow>

<VCol cols="12" md="8"></VCol>

  
  <p class="text-error mx-5"> تم التأخر عن تسليم الطلب تأخر السائق في طريقه</p>

    </VRow>
    <VRow>

<VCol cols="12" md="6">  <VTextField
  label="الزبون"
  :disabled="true"
  >

</VTextField> </VCol>

<VCol cols="12" md="6">  <VTextField
  label="الزبون"
  :disabled="true"
  >

</VTextField> </VCol>


<VCol cols="12" md="6">  <VTextField
  label="الزبون"
  :disabled="true"
  >

</VTextField> </VCol>


<VCol cols="12" md="6">  <VTextField
  label="الزبون"
  :disabled="true"
  >

</VTextField> </VCol>


<VCol cols="12" md="6">  <VTextField
  label="الزبون"
  :disabled="true"
  >

</VTextField> </VCol>


<VCol cols="12" md="6">  <VTextField
  label="الزبون"
  :disabled="true"
  >

</VTextField> </VCol>


    </VRow>
    <VDivider></VDivider>
    <p class="text-center my-5 font-semibold">
      اختر طريقه لمعالجة رسالة التنبيه عبر الاتصال أو ارسال رسالة نصية
    </p>
    <VRow>

      <VCol>
<div   class="text-center">  <VBtn color="success"> الاتصال بالزبون <VIcon> tabler:phone-call</VIcon> </VBtn> </div>

      </VCol>
      <VCol>
        <div  class="text-center">  <VBtn  color="info" >  ارسال رسالة <VIcon> tabler:message</VIcon> </VBtn> </div>

      </VCol>
    </VRow>

    </VCardText>
    <div class="sticky bottom-0">
      <VBtn class="ml-3 mx-5">معالجة</VBtn>
      <VBtn variant="tonal" color="error">تجاهل</VBtn>
      
      </div>
</template>
