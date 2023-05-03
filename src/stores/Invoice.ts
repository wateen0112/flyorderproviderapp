import type { GetAllBranchInvoice, GetDetailsBranchInvoice, GetUnPaidBranchInvoice } from '@/api/Invoice/Shop/dto';
import { BranchInvoiceApi } from '@/api/Invoice/Shop/endpoints';
import { useApi } from '@/composables/index';
import { defineStore } from 'pinia';

export const useInvoiceStore = defineStore('Invoice', () => {
  const { GET } = useApi()
  const BranchInvoiceList = ref<GetAllBranchInvoice[]>([])
  const DetailsBranshinvoice = ref<GetDetailsBranchInvoice[]>([])
  const unPaidBranchInvoice = ref<GetUnPaidBranchInvoice>()

  // Get All Employee
  async function GetAllBranchInvoice() {
    try {
      const response = await GET<GetAllBranchInvoice[]>(
        BranchInvoiceApi.GetAll,
      )

      BranchInvoiceList.value = response.data

      return response
    }
    catch (er) {
      console.log('ERROR FOLDER', er)
    }
  }

  async function GetDetailsBranchInvoice(id: any) {
    try {
      const res = await GET<GetDetailsBranchInvoice>(BranchInvoiceApi.GetById, {
        id,
      });

      DetailsBranshinvoice.value = res.data;
    }
    catch (e: any) {
      console.log(e.response);
    }
  }

  async function GetUnPaidBranchInvoice(id: any) {
    try {
      const res = await GET<GetDetailsBranchInvoice>(BranchInvoiceApi.GetUnPaid, {
        id,
      });

      unPaidBranchInvoice.value = res.data;
    }
    catch (e: any) {
      console.log(e.response);
    }
  }

  return {
    GetAllBranchInvoice,
    BranchInvoiceList,
    GetDetailsBranchInvoice,
    DetailsBranshinvoice,
    GetUnPaidBranchInvoice,
    unPaidBranchInvoice,
  }
})
