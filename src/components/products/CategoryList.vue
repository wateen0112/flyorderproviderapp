<script setup lang="ts">
import { storeToRefs } from "pinia";
import FileUploader from "@/components/shared/FileUploader.vue";
import { useBranchCategoriesStore } from "@/stores/BranchesCategories";
import { useShopStore } from "@/stores/Shop";
import { useProductStore } from "@/stores/Product";
import AddProduct from "@/components/products/AddProduct.vue";
import { AddProduct as AddProductDTO } from "@/api/Product/dto";
import { useRouter } from "vue-router";
import { useFile } from "@/composables/index";
import type { CategoryWithProducts, Product } from "@/api/Product/dto";

const props = defineProps({
  categoryList: {
    type: Array as () => CategoryWithProducts[],
    default: () => [],
  },
  cartList: {
    type: Array,
    default: () => [],
  },
  hideMenu: Boolean,
  isOrder: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["addProductToCart"]);

const { addProductDto } = storeToRefs(useProductStore());
const storeProduct = useProductStore();
const isLoading = ref(false);
const isLoadingProd = ref(false);
const selectedCategory = ref<null | number>(null);
const { getFileUrl } = useFile();
const store = useBranchCategoriesStore();
const isDialogProductVisible = ref(false);
const model = ref(null);
const categorySearch = ref("");
const productSearch = ref("");
const isDialogVisible = ref(false);
const { addBranchCategoryDto } = storeToRefs(useBranchCategoriesStore());
const { shopDetailsDto } = storeToRefs(useShopStore());

function selectProduct(product: Product) {
  emit("addProductToCart", product);
}

const filterList = computed(() =>
  props.categoryList.filter(
    (ele: CategoryWithProducts) =>
      ele.name.includes(categorySearch.value) || !categorySearch.value
  )
);

// const filteredProducts = computed(() => products.value.filter((ele: product) => (!productSearch.value || (products.value.length > 0 && ele.name === productSearch.value))))

const products = computed(() =>
  selectedCategory.value !== null
    ? props.categoryList[selectedCategory.value].products
    : []
);

function addCategories() {
  isLoading.value = true;
  store
    .AddBarnchCategories(addBranchCategoryDto.value)
    .then((response: any) => {
      props.categoryList.unshift(response.data);
      isLoading.value = false;
      isDialogVisible.value = false;
      addBranchCategoryDto.value.name = "";
      addBranchCategoryDto.value.imageFile = null;
    });
}
function delCategory(id: string) {
  store.DeleteBarnchCategories(id).then(() => {
    shopDetailsDto.value.branch.categories =
      shopDetailsDto.value.branch.categories.filter(
        (ele: any) => ele.id !== id
      );
  });
}
function delProduct(id: string) {
  storeProduct.deleteProduct(id).then(() => {
    products.value = products.value.filter((ele) => ele.id !== id);
  });
}
function addMoreProduct() {
  isLoadingProd.value = true;
  storeProduct
    .AddNewProduct({
      ...addProductDto.value,
      branchId: shopDetailsDto.value.branch.id,
    })
    .then((response: any) => {
      products.value.unshift(response.data);
      isLoadingProd.value = false;
      new AddProductDTO();
      isDialogProductVisible.value = false;
    });
}
function setSelectedCategory(idx: number) {
  selectedCategory.value = idx;
}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard class="p-5">
          <div class="flex items-center justify-between">
            <VLabel class="mb-2"> الاصناف </VLabel>
            <div class="flex items-center justify-between gap-4 w-1/2">
              <VTextField
                v-model="categorySearch"
                prepend-inner-icon="mdi-search"
                placeholder="ابحث بصنف المتجر"
              />
              <VDialog v-model="isDialogVisible" max-width="600">
                <template #activator="{ props }">
                  <VBtn v-bind="props"> إضافة صنف </VBtn>
                </template>

                <!-- Dialog close btn -->
                <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

                <!-- Dialog Content -->
                <VCard title="اضافة صنف">
                  <VCardText>
                    <VRow>
                      <VCol cols="12">
                        <label for="order">الاسم الصنف</label>
                      </VCol>
                      <VCol cols="12">
                        <VTextField v-model="addBranchCategoryDto.name" />
                      </VCol>
                      <VCol cols="12">
                        <label for="order">ايقونة الصنف</label>
                      </VCol>
                      <VCol cols="12">
                        <FileUploader
                          v-model:url="addBranchCategoryDto.imageUrl"
                          v-model="addBranchCategoryDto.imageFile"
                        />
                      </VCol>
                    </VRow>
                  </VCardText>

                  <VCardText class="d-flex justify-end flex-wrap gap-3">
                    <VBtn
                      variant="tonal"
                      color="secondary"
                      @click="isDialogVisible = false"
                    >
                      Close
                    </VBtn>
                    <VBtn :loading="isLoading" @click="addCategories">
                      Save
                    </VBtn>
                  </VCardText>
                </VCard>
              </VDialog>
            </div>
          </div>
          <VSheet
            v-if="categoryList.length"
            class="mx-auto mt-3"
            max-width="1200"
          >
            <VSlideGroup v-model="model" class="pa-4">
              <VSlideGroupItem
                v-for="(category, i) in categoryList"
                :key="category.id"
                v-slot="{ selectedClass }"
              >
                <VCard
                  color="grey-lighten-1"
                  :class="[
                    selectedClass,
                    {
                      'shadow-md ring-2 ring-main shadow-main':
                        i === selectedCategory,
                    },
                  ]"
                  class="relative ma-4 p-5 rounded-xl"
                  height="200"
                  width="165"
                  @click="setSelectedCategory(i)"
                >
                  <div
                    class="flex fill-height items-center flex-col justify-center"
                  >
                    <VMenu v-if="!hideMenu">
                      <template #activator="{ props }">
                        <VBtn
                          v-bind="props"
                          class="absolute top-2 left-1"
                          icon
                          variant="text"
                          color="default"
                          size="x-small"
                        >
                          <VIcon
                            icon="mdi-dots-vertical"
                            :size="22"
                            color="primary"
                          />
                        </VBtn>
                      </template>

                      <VList
                        class="flex justify-center items-start flex-col gap-2"
                      >
                        <div>
                          <VListItem
                            value="1"
                            variant="text"
                            color="default"
                            size="x-small"
                            @click="delCategory(category.id)"
                          >
                            <span> حذف تصنيف </span>
                            <VIcon
                              icon="mdi-trash-can-outline"
                              :size="22"
                              color="primary"
                            />
                          </VListItem>
                        </div>
                        <div>
                          <VListItem
                            value="2"
                            variant="text"
                            color="default"
                            size="x-small"
                          >
                            <span class="ml-1 text-sm"> تفاصيل تصنيف </span>
                            <VIcon
                              icon="mdi-information-outline"
                              :size="22"
                              color="primary"
                            />
                          </VListItem>
                        </div>
                      </VList>
                    </VMenu>
                    <img
                      class="w-full h-52 object-contain"
                      :src="getFileUrl(category.imageUrl)"
                    />
                    <h4 class="my-2">
                      {{ category.name }}
                    </h4>
                  </div>
                </VCard>
              </VSlideGroupItem>
            </VSlideGroup>
          </VSheet>
          <div v-else class="flex justify-center items-center w-full">
            <h3>لايوجد بيانات</h3>
          </div>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VCard class="p-5">
          <div class="flex items-center justify-between">
            <VLabel class="mb-2"> المنتجات </VLabel>
            <div class="flex items-center justify-between gap-4 w-1/2">
              <VTextField
                v-model="productSearch"
                prepend-inner-icon="mdi-search"
                placeholder="ابحث بالمنتجات"
              />
              <VDialog v-model="isDialogProductVisible" max-width="800">
                <template #activator="{ props }">
                  <VBtn v-bind="props"> إضافة منتج </VBtn>
                </template>

                <DialogCloseBtn
                  @click="isDialogProductVisible = !isDialogProductVisible"
                />
                <VCard title="اضافة منتج" class="relative">
                  <VCardText>
                    <AddProduct />
                  </VCardText>
                  <VCardText class="d-flex justify-end flex-wrap gap-3">
                    <VBtn
                      variant="tonal"
                      color="secondary"
                      @click="isDialogProductVisible = false"
                    >
                      Close
                    </VBtn>
                    <VBtn :loading="isLoading" @click="addMoreProduct">
                      Save
                    </VBtn>
                  </VCardText>
                </VCard>
              </VDialog>
            </div>
          </div>
          <div class="flex justify-start items-start flex-wrap mt-4 gap-5">
            <div class="flex justify-center items-center w-full">
              <h3 v-if="selectedCategory === null" class="mt-5">
                اختر صنف معين لرؤية منتجه
              </h3>

              <h3
                v-if="selectedCategory !== null && products.length === 0"
                class="mt-5"
              >
                لا يوجد صنف لهذا المنتج
              </h3>
            </div>

            <template v-if="selectedCategory !== null && products.length">
              <VCard
                v-for="product in products"
                :key="product.id"
                :elevation="2"
                class="relative w-48 rounded-xl h-60 flex justify-start items-center flex-col"
              >
                <VMenu>
                  <template #activator="{ props }">
                    <VBtn
                      v-bind="props"
                      class="absolute top-2 left-0"
                      icon
                      variant="text"
                      color="default"
                      size="x-small"
                    >
                      <VIcon
                        icon="mdi-dots-vertical"
                        :size="22"
                        color="primary"
                      />
                    </VBtn>
                  </template>

                  <VList
                    class="flex justify-center items-start flex-col py-4 gap-2"
                  >
                    <div>
                      <VBtn
                        variant="text"
                        color="default"
                        size="x-small"
                        @click="delProduct(product.id)"
                      >
                        <h2 class="ml-1 text-sm">حذف منتج</h2>
                        <VIcon
                          icon="mdi-trash-can-outline"
                          :size="22"
                          color="primary"
                        />
                      </VBtn>
                    </div>
                    <div>
                      <VBtn variant="text" color="default" size="x-small">
                        <h2 class="ml-1 text-sm">تفاصيل منتج</h2>
                        <VIcon
                          icon="mdi-information-outline"
                          :size="22"
                          color="primary"
                        />
                      </VBtn>
                    </div>
                  </VList>
                </VMenu>
                <VBadge
                  :color="product.isAvailable ? 'success' : 'error'"
                  class="absolute right-6 top-5"
                />
                <img
                  :src="getFileUrl(product.imageUrl)"
                  class="w-full h-40 object-cover"
                />
                <div class="px-3 py-2">
                  <h4>
                    {{ product.name }}
                  </h4>
                  <span class="text-primary">{{ product.price }} ل.س</span>
                </div>
                <div
                  v-if="isOrder"
                  class="absolute opacity-0 transition-all z-10 top-0 left-0 backdrop:blur-md backdrop-blur rounded-xl bg-white flex items-center justify-center h-full w-full bg-opacity-50 hover:opacity-100"
                >
                  <VBtn
                    color="success"
                    variant="flat"
                    prepend-icon="mdi-cart"
                    @click="selectProduct(product)"
                  >
                    إضافة للسلة
                  </VBtn>
                </div>
              </VCard>
            </template>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
