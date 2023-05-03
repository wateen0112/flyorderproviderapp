import { useSettingStore } from './Setting';
import type {
  GetAllCustomer,
  GetAllCustomerDTO,
  GetDetailsCustomerDto,
} from '@/api/Customer/dto';
import { CustomerApi } from '@/api/Customer/endpoints';
import { useApi, usePagination } from '@/composables/index';
import { defineStore } from 'pinia';

import {
  AddCustomer as AddCustomerDto,
  AddAddress as AddAddressDto,
  DetailsCustomer,
  GetAllCustomerFilters,
  CustomerSearch,
} from './../api/Customer/dto';
import type { Address } from '@/types/address';

export const useCustomerStore = defineStore('Customer', () => {
  const { GET, POST, DELETE } = useApi();
  const settingStore = useSettingStore()
  const CustomerList = ref<GetAllCustomer[]>([]);
  const CustomerName = ref<GetAllCustomer[]>([]);
  const customerDto = ref(new AddCustomerDto());
  const addressDto = ref<AddAddressDto>(new AddAddressDto());
  const customerDetailsDto = ref(new DetailsCustomer());
  const { pagination } = usePagination();
  const filterDto = ref<GetAllCustomerFilters>(new GetAllCustomerFilters());

  const filterVal = ref('');
  const customerData = ref(new CustomerSearch());

  // Get All Customer
  async function GetAllCustomer() {
    try {
      const response = await GET<GetAllCustomerDTO>(CustomerApi.GetAll, {
        ...pagination.value,
        ...filterDto.value,
      });

      CustomerList.value = response.data.customers;
      pagination.value.totalCount = response.data.count;

      return response;
    }
    catch (er) {
      console.log('ERROR FOLDER', er);
    }
  }

  // GetName Customer
  async function GetNameCustomer() {
    try {
      const response = await GET<GetAllCustomer[]>(CustomerApi.GetNames);

      CustomerName.value = response.data;

      return response;
    }
    catch (er) {
      console.log('ERROR FOLDER', er);
    }
  }

  // Get Details Customer
  async function GetDetailsCustomer(id: any) {
    const response: any = await GET<GetDetailsCustomerDto>(
      CustomerApi.GetById + id,
      { ...pagination.value, ...filterDto.value },
    );

    customerDetailsDto.value = response.data.customer;
    pagination.value.totalCount = response.data.orderPagination;
    console.log(response);
  }

  // Add Customer
  async function AddCustomer(payload: Address) {

    if (settingStore.areaName(payload.areaId) !== 'سكن جامعي') {

      console.log('AFTER', payload);
      payload.dormitoryAddress = null;

    }

    const response = await POST(CustomerApi.Add, payload, {
      error: true,
      success: 'تمت الاضافة بنجاح',
    });

    CustomerList.value?.unshift(payload);

    console.log(response);
  }

  // Modify Customer
  async function ModifyCustomer(payload: Address) {
    console.log('modify customer route');

    if (settingStore.areaName(payload.areaId) !== 'سكن جامعي')
      payload.dormitoryAddress = null;

    const response = await POST(CustomerApi.Modify, payload, {
      success: 'تم التعديل بنجاح',
    });

    if (response?.data)
      customerDetailsDto.value = { ...response.data }

  }

  // Delete Customer
  async function DeleteCustomer(ids: string[]) {
    await DELETE(CustomerApi.Delete, ids);

    CustomerList.value = CustomerList.value?.filter(
      (item: any) => !ids.includes(item.id),
    );
  }

  // filter Customer
  const filterListCustomer = computed(() => {
    return CustomerList.value.filter(
      (ele: { name: string; orderCount: number; phoneNumber: string }) =>
        ele.name.toLowerCase().includes(filterVal.value.toLowerCase())
        || ele.orderCount
          .toString()
          .toLowerCase()
          .includes(filterVal.value.toLowerCase())
        || ele.phoneNumber.toLowerCase().includes(filterVal.value.toLowerCase())
        || !CustomerList.value,
    );
  });

  const paginateListCustomer = computed(() => {
    return filterListCustomer.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex,
    );
  });

  // Add Address
  async function AddAddress(payload: Address) {
    if (settingStore.areaName(payload.areaId) !== 'سكن جامعي')

      payload.dormitoryAddress = null;

    await POST(CustomerApi.AddAddress, payload, {
      error: true,
      success: 'تمت الاضافة بنجاح',
    });

    GetDetailsCustomer(customerDetailsDto.value.id)

    customerDetailsDto.value.address?.unshift(payload);
    customerData.value?.addresses?.push(payload);
  }

  // modify Address
  async function ModifyAddress(payload: Address) {
    console.log('modify Adress route');

    console.log(settingStore.areaName(payload.areaId));

    if (settingStore.areaName(payload.areaId) !== 'سكن جامعي') {
      payload.dormitoryAddress = null
      console.log('its wtf');

    }

    await POST(CustomerApi.ModifyAddress, payload, {
      error: true,
      success: 'تم التعديل  بنجاح',
    });

    GetDetailsCustomer(customerDetailsDto.value.id);
  }

  // Delete Address
  async function DeleteAddress(ids: string[]) {
    await DELETE(CustomerApi.DeleteAddress, ids);

    customerDetailsDto.value.address = customerDetailsDto.value.address?.filter(
      (item: any) => !ids.includes(item.id),
    );
  }

  // Search
  function findCustomer(payload: string) {
    filterVal.value = payload;
  }

  return {
    GetNameCustomer,
    CustomerName,
    GetAllCustomer,
    GetDetailsCustomer,
    CustomerList,
    AddCustomer,
    ModifyCustomer,
    DeleteCustomer,
    pagination,
    filterListCustomer,
    findCustomer,
    customerDto,
    customerDetailsDto,
    paginateListCustomer,
    filterDto,
    addressDto,
    AddAddress,
    ModifyAddress,
    DeleteAddress,
    customerData,
  };
});
