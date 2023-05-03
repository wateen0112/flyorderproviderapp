import { GetAllOrdersFilters, ConfirmAddDTO } from './../api/Order/dto';
import type { OrderCart, GetAllOrderDTO, OrderItem, OrderShopsItemDTO, CartItem } from './../api/Order/dto';
import { BranchCategoryApi } from '@/api/BranchCategory/endpoints';
import type { CustomerSearchDTO } from '@/api/Customer/dto';
import type { CategoryWithProducts } from '@/api/Product/dto';
import { OrderApi } from '@/api/Order/endpoints';
import { useApi, usePagination } from '@/composables/index';
import { Order_Status } from '@/enums/OrderStatus';
import { defineStore } from 'pinia';
import { useSettingStore } from './Setting';
import { OrderCartApi } from '@/api/OrderCart/endpoints';
import type { CalcInvoiceDTO, InvoiceDTO } from '@/api/OrderCart/dto';

export const useOrderStore = defineStore('order', () => {
  const setting = useSettingStore()
  const { pagination } = usePagination()
  const { GET, POST } = useApi();
  const orders = ref<OrderItem[]>([]);
  const filterDto = ref<GetAllOrdersFilters>(new GetAllOrdersFilters());
  const orderStatusOptions = ref([{ name: 'غير مؤكد', value: Order_Status.UnConfirmed }, { name: 'ملغي', value: Order_Status.Cansel }, { name: 'تم التسليم', value: Order_Status.Done }, { name: ' مرتجع', value: Order_Status.RollBack }, { name: 'قيد التجهيز', value: Order_Status.InProcess }, { name: 'في الطريق', value: Order_Status.OnWay }])
  const orderShopsList = ref<OrderShopsItemDTO[]>([])
  const selectedAddress = ref()
  const selectedShop = ref<OrderShopsItemDTO>()
  const categoriesWithProducts = ref<CategoryWithProducts[]>([])
  const confirmOrderDto = ref<ConfirmAddDTO>(new ConfirmAddDTO())

  // CREATE ORDER STATE

  const customerData = ref<CustomerSearchDTO>({
    addresses: [],
    cityId: '',
    id: '',
    name: '',
    orders: [],
    phoneNumber: '',
  })

  const orderInvoice = ref<InvoiceDTO>({
    coast: 0,
    deliveryCoast: 0,
    discount: 0,
    orderCartsCount: 0,
    tax: 0,
    total: 0,
  })

  const orderCartProducts = ref<CartItem[]>([]);

  const getAreaName = (id: string) => setting.areas.find(a => a.id === id)?.name

  // ? Getters

  const orderFilterParams = computed(() => ({ ...filterDto.value, ...pagination.value }))

  const currentOrderAreaID = computed(() => orderShopsList.value.find(sh => (orderCartProducts.value.length > 0 && sh.id === orderCartProducts.value[0].branchId))?.areaId || '')

  const addresses = computed(() =>
    customerData.value?.addresses.map(a => {
      if (a.dormitoryAddress) {
        return {
          id: a.id,
          text: `${getAreaName(a.areaId)} - ${a.name} - الوحدة : ${a.dormitoryAddress.numberNum} - الغرفة : ${a.dormitoryAddress.roomNum}`,
        }
      }

      else if (a.residentialAddress) {
        return {
          id: a.id,
          text: `${getAreaName(a.areaId)} - ${a.name} -${a.residentialAddress.street} `,
        }
      }

      else { return { text: a.name, id: a.id } }
    }),

  )

  const selectedShops = computed(() => orderShopsList.value.filter(s => orderCartProducts.value.some(p => p.branchId === s.id)))

  const branchesDtoList = computed(() => selectedShops.value.map(s => ({
    id: s.id,
    orderCarts: orderCartProducts.value.map(item => ({
      branchId: s.id,
      note: item.note,
      productExtraItemIds: item.productExtraItems.map(e => e.id),
      productId: item.id,
      quantity: item.quantity,
    } as OrderCart)),

  })))

  const canFinishOrder = computed(() => selectedShops.value.length > 0);

  // ? Actions

  function AddProductToCart(product: CartItem) {
    const exictedProduct = orderCartProducts.value.find(p => p.id === product.id)
    if (exictedProduct)
      exictedProduct.quantity++;

    else

      orderCartProducts.value.push({ ...product })

  }

  function removeCartItem(itemId: string) {
    orderCartProducts.value = orderCartProducts.value.filter(item => item.id !== itemId);
  }

  function setCartItemQuantity(itemId: string, value: number) {
    const product = orderCartProducts.value.find(item => item.id === itemId)
    if (product && +value > 0)
      product.quantity = value
  }

  const GetProductsForSelectedShop = async (id: string) => {
    try {
      const { data } = await GET<CategoryWithProducts[]>(BranchCategoryApi.GetAll, { branchId: id })

      categoriesWithProducts.value = data;
    }
    catch (er) {
      console.log(er);

    }
  }

  // ! ASYNC Actions

  const GetAllOrder = async () => {
    try {
      const res = await GET<GetAllOrderDTO>(OrderApi.GetAll,
        { ...pagination.value, ...filterDto.value });

      orders.value = res.data.orders
      pagination.value.totalPages = res.data.count;
    }

    catch (e) {

    }
  }

  const GetConfirmAdd = async () => {
    try {
      const result = await GET<OrderShopsItemDTO[]>(OrderApi.GetConfirmAdd, {
        cityId: customerData.value?.cityId,
        addressAreaId: customerData.value?.addresses[0].areaId,
      })

      orderShopsList.value = result.data;

    }

    catch (er) {

    }
  }

  const ConfirmOrder = async () => {
    await POST<{ stage: string; id: string }, ConfirmAddDTO>(OrderApi.ConfirmAdd, {
      ...confirmOrderDto.value,
      branches: branchesDtoList.value,
      customerId: customerData.value.id,
      addressId: selectedAddress.value,
    })
  }

  const CalcInvoice = async () => {
    if (confirmOrderDto.value.offerId === '')
      confirmOrderDto.value.offerId = null
    if (canFinishOrder.value) {
      const res = await POST<InvoiceDTO, CalcInvoiceDTO>(OrderCartApi.CalcInvoice, {
        areaId: currentOrderAreaID.value,
        branches: branchesDtoList.value,
        customerId: customerData.value.id,
        offerId: confirmOrderDto.value.offerId,

      })

      if (res?.data)
        orderInvoice.value = res?.data
    }

  }

  return {
    GetAllOrder,
    CalcInvoice,
    GetConfirmAdd,
    orders,
    selectedAddress,
    filterDto,
    pagination,
    orderStatusOptions,
    orderFilterParams,
    customerData,
    addresses,
    orderShopsList,
    selectedShop,
    currentOrderAreaID,
    GetProductsForSelectedShop,
    categoriesWithProducts,
    confirmOrderDto,
    AddProductToCart,
    orderCartProducts,
    removeCartItem,
    setCartItemQuantity,
    selectedShops,
    orderInvoice,
    ConfirmOrder,
    canFinishOrder,
  }
})
