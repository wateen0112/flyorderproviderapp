import { ProductApi } from '@/api/Product/endpoints';
import { AddProduct } from '@/api/Product/dto';
import { defineStore } from 'pinia';
import { useApi, usePagination } from "@/composables/index";

export const useProductStore = defineStore('Product', () => {
  const { GET, POST, DELETE } = useApi();
  const addProductDto = ref(new AddProduct())

  async function AddNewProduct(payload: any) {
    console.log(payload);

    try {
      const response = await POST(
        ProductApi.Add,
        payload,
        { error: true, success: 'تم الاضافة بنجاح' },
        { formData: true },
      );
      return response;
    }
    catch (er) {
    }
  }
  async function deleteProduct(id: any) {

    try {
      const response = await DELETE(
        ProductApi.Delete,
        [id],
        { error: true, success: 'تم الحذف بنجاح' },

      );

    }
    catch (er) {
    }
  }

  return { AddNewProduct, addProductDto, deleteProduct };
});
