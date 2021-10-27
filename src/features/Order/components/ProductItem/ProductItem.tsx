import { ProductItemProps } from 'features/Order/interface'

const ProductItem: React.FC<ProductItemProps> = ({
  product: {
    productRef: { name: productName, images },
    cost,
    quantity,
  },
}) => {
  return (
    <div className='flex items-center bg-gray-100 rounded-sm shadow-sm p-1'>
      <img
        src={images[0]}
        alt={productName}
        className='w-14 h-14 object-contain inline-block mr-2'
      />
      <div className='text-left'>
        <div className='text-sm font-medium'>{productName}</div>
        <div>
          <span className='text-sm'>{cost.toLocaleString()}₫</span>{' '}
          <span className='text-sm'>({quantity})</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
