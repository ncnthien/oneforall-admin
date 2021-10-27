import { OrderTableProps, Product } from 'features/Order/interface'
import { ProductItem } from 'features/Order/components'
import { swal } from 'helper'

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  updateOrderStatus,
  deleteOrder,
}) => {
  const handleOrderStatusChange =
    (orderId: string, orderCode: string) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const updateState = event.target.value
      updateOrderStatus(orderId, orderCode, updateState)
    }

  const handleRemoveOrderClick = (orderId: string, orderCode: string) => () => {
    swal
      .fire({
        title: `Are you sure to delete order ${orderCode}`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      })
      .then(async result => {
        if (result.isConfirmed) {
          deleteOrder(orderId)
        }
      })
  }

  const calculateTotalCost = (products: Product[]): number =>
    products.reduce((total, product) => total + product.cost, 0)

  const renderProductItems = (products: Product[]): JSX.Element[] =>
    products.map(product => <ProductItem key={product._id} product={product} />)

  const renderTableData = (): JSX.Element[] =>
    orders.map(({ _id, code, date, products, user, status }) => {
      const dateTime = new Date(date)

      return (
        <tr key={_id} className='text-center border-b-2 min-w-max'>
          <td className='py-2 px-4'>{code}</td>
          <td className='py-2 px-4'>{dateTime.toLocaleDateString()}</td>
          <td className='py-2 px-4'>
            <div>{renderProductItems(products)}</div>
            <div className='text-left mt-1'>
              Total cost: {calculateTotalCost(products).toLocaleString()}₫
            </div>
          </td>
          <td className='py-2 px-4'>{user.email}</td>
          <td className='py-2 px-4'>
            <select
              onChange={handleOrderStatusChange(_id, code)}
              defaultValue={status}
              className='appearance-none text-center text-sm py-2 px-3 focus:outline-none cursor-pointer bg-cyan-400 rounded-md text-white mr-1 hover:bg-cyan-500 transition-all'
            >
              <option value='pending' className='bg-white text-gray-900'>
                Pending
              </option>
              <option value='claimed' className='bg-white text-gray-900'>
                Claimed
              </option>
              <option value='delivering' className='bg-white text-gray-900'>
                Delivering
              </option>
              <option value='delivered' className='bg-white text-gray-900'>
                Delivered
              </option>
            </select>
            <button
              onClick={handleRemoveOrderClick(_id, code)}
              className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
            >
              Remove
            </button>
          </td>
        </tr>
      )
    })

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Code</th>
          <th className='py-4'>Date</th>
          <th className='py-4'>Products</th>
          <th className='py-4'>Buyer</th>
          <th className='py-4'>Action</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default OrderTable
