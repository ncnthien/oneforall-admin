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
          title: `Are you sure to delete product ${productName}`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
        })
        .then(async result => {
          if (result.isConfirmed) {
            deleteProduct(productId)
          }
        })
    }

  const renderTableData = (): JSX.Element[] =>
    products.map(({ images, name, quantity, _id }) => (
      <tr key={_id} className='text-center border-b-2 min-w-max'>
        <td className='py-2 px-4'>
          <img src={images[0]} alt={name} className='w-44 inline' />
        </td>
        <td className='py-2 px-4'>{name}</td>
        <td className='py-2 px-4'>{quantity}</td>
        <td className='py-2 px-4'>
          <Link
            to={{
              pathname: `/product/${_id}`,
              state: { _id },
            }}
            className='bg-cyan-400 text-white rounded py-2 px-3 inline-block mr-1 text-sm hover:bg-cyan-500 transition-all'
          >
            Detail
          </Link>
          <button
            onClick={handleDeleteProductButton(_id, name)}
            className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
          >
            Remove
          </button>
        </td>
      </tr>
    ))

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Image</th>
          <th className='py-4'>Name</th>
          <th className='py-4'>Quantity</th>
          <th className='py-4'>Action</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default ProductTable
