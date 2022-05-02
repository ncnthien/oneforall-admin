import { OrderTableProps, Product } from 'features/Order/interface'
import { ProductItem } from 'features/Order/components'
import { swal } from 'helper'

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  updateOrderStatus,
  deleteOrder,
}) => {
  const handleOrderStatusChange =
    (orderId: string, userId: string, orderStatus: 'paid' | 'UNPAID') => () => {
      updateOrderStatus(orderId, userId, orderStatus)
    }

  const handleRemoveOrderClick = (orderId: string) => () => {
    swal
      .fire({
        title: `Bạn có chắc muốn xóa hóa đơn ${orderId}`,
        text: 'Bạn sẽ không thể hoàn tác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa!',
      })
      .then(async result => {
        if (result.isConfirmed) {
          deleteOrder(orderId)
        }
      })
  }

  const renderTableData = (): JSX.Element[] =>
    orders.map(order => {
      const dateTime = new Date(order.createdAt)

      return (
        <tr key={order._id} className='text-center border-b-2 min-w-max'>
          <td className='py-2 px-4'>{order._id}</td>
          <td className='py-2 px-4'>{dateTime.toLocaleDateString()}</td>
          <td className='py-2 px-4'>{order.user.username}</td>
          <td className='py-2 px-4'>{order.user.phone}</td>
          <td className='py-2 px-4'>{order.slot}</td>
          <td className='py-2 px-4'>{order.cost.toLocaleString()} VND</td>
          <td className='py-2 px-4'>{order.tour.title}</td>
          <td className='py-2 px-4'>
            <button
              className={`${
                order.status === 'paid' ? 'bg-green-400' : 'bg-yellow-400'
              } text-white rounded py-2 px-3 mr-2 ionline-block text-sm ${
                order.status === 'paid'
                  ? 'hover:bg-green-500'
                  : 'hover:bg-yellow-500'
              } transition-all`}
              onClick={handleOrderStatusChange(
                order._id,
                order.userId,
                order.status === 'UNPAID' ? 'paid' : 'UNPAID'
              )}
            >
              {order.status === 'paid' ? 'đã thanh toán' : 'chưa thanh toán'}
            </button>
            <button
              onClick={handleRemoveOrderClick(order._id)}
              className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
            >
              Xóa
            </button>
          </td>
        </tr>
      )
    })

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Mã</th>
          <th className='py-4'>Ngày</th>
          <th className='py-4'>Người đặt</th>
          <th className='py-4'>Số điện thoại</th>
          <th className='py-4'>Số chỗ</th>
          <th className='py-4'>Giá</th>
          <th className='py-4'>Tour</th>
          <th className='py-4'>Action</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default OrderTable
