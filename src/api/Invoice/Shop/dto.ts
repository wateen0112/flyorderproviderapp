export interface GetAllBranchInvoice {
  id: string
  name: string
  lastInvoiceDate: string
  ordersCount: number
  unPaidOrdersCount: number
  incoming: number
}

export interface GetDetailsBranchInvoice {
  id: string
  number: number
  dateCreated: string
  incoming: number
}

 interface Order {
  id: string
  dateCreated: string
  orderNumber: number
  profitPercent: number
  coast: number
  coastWithDiscount: number
  incoming: number
}
export interface GetUnPaidBranchInvoice {
  number: number
  orders: Order[]
}
