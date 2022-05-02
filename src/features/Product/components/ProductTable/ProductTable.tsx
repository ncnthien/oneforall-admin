import { Link } from 'react-router-dom'
import { ProductTableProps } from 'features/Product/interface'
import { swal } from 'helper'

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  deleteProduct,
}) => {
  const handleDeleteProductButton =
    (productId: string, productName: string) => () => {
      swal
        .fire({
          title: `Bạn có chắc muốn xóa tour ${productName}`,
          text: 'Bạn sẽ không thể hoàn tác!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa!',
        })
        .then(async result => {
          if (result.isConfirmed) {
            deleteProduct(productId)
          }
        })
    }

  const renderTableData = (): JSX.Element[] =>
    products.map(tour => (
      <tr key={tour._id} className='text-center border-b-2 min-w-max'>
        <td className='py-2 px-4'>
          <img src={tour.images[0]} alt={tour.title} className='w-44 inline' />
        </td>
        <td className='py-2 px-4'>{tour.title}</td>
        <td className='py-2 px-4'>{tour.availableSlot}</td>
        <td className='py-2 px-4'>{tour.price.toLocaleString()} VND</td>
        <td className='py-2 px-4'>
          <Link
            to={`/tour/${tour._id}`}
            className='bg-cyan-400 text-white rounded py-2 px-3 inline-block mr-1 text-sm hover:bg-cyan-500 transition-all'
          >
            Chi tiết
          </Link>
          <button
            onClick={handleDeleteProductButton(tour._id, tour.title)}
            className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
          >
            Xóa
          </button>
        </td>
      </tr>
    ))

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Ảnh</th>
          <th className='py-4'>Tên</th>
          <th className='py-4'>Số chỗ</th>
          <th className='py-4'>Giá</th>
          <th className='py-4'>Action</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default ProductTable
