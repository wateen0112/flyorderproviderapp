import type { Product, ProductExtra } from './../Product/dto';
import type { Order_Stage } from '@/enums/OrderStage'
import type { Order_Status } from '@/enums/OrderStatus'
import type { Pagination } from '@/types/app/Pagination'

export class GetAllOrdersFilters {
  startDate = ''
  endDate = ''
  status?: Order_Status | '' = ''
  cityId = ''
  search = ''
}
export interface GetAllOrdersParams extends GetAllOrdersFilters, Pagination {
}
export interface OrderItem {
  id: string
  number: number
  customerName: string
  phoneNumber: string
  address: string
  branchNames: string[]
  date: string
  driverName: string
  orderType: string
  progress: Progress
}

interface Progress {
  status: string
  stage: string
  date: string
}
export interface GetAllOrderDTO {
  count: number
  orders: OrderItem[]

}
export interface OrderShopsItemDTO {
  areaId: string
  hasDeliveryService: boolean
  id: string
  isOnline: boolean
  name: string
}
export class ConfirmAddDTO {
  customerId = ''
  offerId?: string | null = ''
  addressId = ''
  priorDate?: null | string = null
  note = ''
  branches: Branch[] = []
}

export interface Branch {
  id: string
  orderCarts: OrderCart[]
}

export class OrderCart {
  productId = '';
  note = '';
  quantity = 0;
  productExtraItemIds: string[] = [];
}

export class CartItem implements Product {
  productExtraItems: ProductExtra[] = [];
  id = ''
  name = ''
  imageUrl = ''
  branchId = ''
  note = ''

  quantity = 0
  price = 0

}
