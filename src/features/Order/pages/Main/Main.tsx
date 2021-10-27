import orderApi from 'apis/orderApi'
import { OrderTable } from 'features/Order/components'
import { useEffect, useState } from 'react'
import { Order } from 'features/Order/interface'
import { getClone, swal } from 'helper'

const Main: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const {
          data: { orderList: orders },
        } = await orderApi.getAll()

        setOrders(orders)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrders()
  }, [])

  const handleUpdateOrderStatus = async (
    orderId: string,
    orderCode: string,
    updateState: string
  ) => {
    try {
      const okStatus = 200
      const {
        data: { updatedOrder },
        status,
      } = await orderApi.update(orderId, updateState)
      if (status === okStatus) {
        const clonedOrders = getClone(orders)
        const orderIndex = clonedOrders.findIndex(
          order => order._id === updatedOrder._id
        )
        clonedOrders[orderIndex] = updatedOrder

        setOrders(clonedOrders)

        swal.fire(
          'Done!',
          `Order ${orderCode} status is ${updateState} now!`,
          'success'
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const okStatus = 200
      const { status } = await orderApi.delete(orderId)
      if (status === okStatus) {
        const clonedOrders = getClone(orders)
        const newOrders = clonedOrders.filter(order => order._id !== orderId)
        setOrders(newOrders)

        swal.fire('Done!', 'Order is deleted successfully!', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <OrderTable
        orders={orders}
        updateOrderStatus={handleUpdateOrderStatus}
        deleteOrder={handleDeleteOrder}
      />
    </div>
  )
}

export default Main
