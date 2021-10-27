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
  _id: string
  code: string
  date: string
  products: Product[]
  status: 'pending' | 'claimed' | 'delivering' | 'delivered'
  user: {
    email: string
  }
}

export interface GetOrdersData {
  orderList: Order[]
}

export interface UpdateOrderData {
  updatedOrder: Order
}

export interface OrderTableProps {
  orders: Order[]
  updateOrderStatus: (
    orderId: string,
    orderCode: string,
    updateStatus: string
  ) => void
  deleteOrder: (orderId: string) => void
}

export interface ProductItemProps {
  product: Product
}
