export interface Product {
  productRef: {
    name: string
    images: string[]
  }
  quantity: number
  cost: number
  _id: string
}

export interface Order {
  cost: number
  createdAt: string
  slot: number
  status: 'paid' | 'UNPAID'
  tourId: string
  updatedAt: string
  userId: string
  user: {
    phone: string
    username: string
  }
  __v: number
  _id: string
  tour: {
    title: string
  }
}

export interface GetOrdersData {
  data: Order[]
  pagination: {
    page: number
    limit: number
    total: number
  }
}

export interface UpdateOrderData {
  updatedOrder: Order
}

export interface OrderTableProps {
  orders: Order[]
  updateOrderStatus: (
    orderId: string,
    userId: string,
    orderStatus: 'paid' | 'UNPAID'
  ) => void
  deleteOrder: (orderId: string) => void
}

export interface ProductItemProps {
  product: Product
}
