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
          data: { data: orders },
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
    userId: string,
    orderStatus: 'paid' | 'UNPAID'
  ) => {
    try {
      const okStatus = 200
      const { status } = await orderApi.update(orderId, userId, orderStatus)
      if (status === okStatus) {
        const clonedOrders = getClone(orders)
        const orderIndex = clonedOrders.findIndex(
          order => order._id === orderId
        )
        clonedOrders[orderIndex].status = orderStatus

        setOrders(clonedOrders)

        swal.fire(
          'Xong!',
          `Đơn ${orderId} đã chuyển trạng thái thành ${
            orderStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'
          }!`,
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

        swal.fire('Xong!', 'Đơn đã được xóa thành công!', 'success')
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
