import { Link } from 'react-router-dom'
import { ProductBody } from 'features/Product/interface'
import { useState } from 'react'
import { convertToBase64, getClone } from 'helper'

const ProductAdd: React.FC = () => {
  const defaultProduct: ProductBody = {
    name: '',
    type: 'laptop',
    brand: '',
    subBrand: '',
    price: 0,
    isSale: false,
    images: [],
    quantity: 0,
  }
  const [product, setProduct] = useState<ProductBody>(defaultProduct)

  const renderImages = (): JSX.Element[] =>
    product.images.map((image, index) => (
      <div key={index} className='w-36 h-36 relative mr-4 mb-4'>
        <img
          src={image}
          alt=''
          className='h-full w-full object-contain border-2'
        />
        <button className='absolute top-1 right-1 w-5 h-5 text-gray-200 border-2 border-gray-200 rounded-full flex items-center justify-center'>
          <span className='text-sm leading-none'>x</span>
        </button>
      </div>
    ))

  const handleFormChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return
    }

    const targetFile = event.target.files[0]
    const base64Image = (await convertToBase64(targetFile)) as string
    const clonedProduct = getClone(product)
    clonedProduct.images.push(base64Image)

    setProduct(clonedProduct)
    console.log(clonedProduct.images)
  }

  return (
    <div>
      <div className='mb-8'>
        <Link
          to='/product'
          className='text-white bg-cyan-400 py-2 px-4 rounded-md shadow-md hover:bg-cyan-500 transition-all'
        >
          Back
        </Link>
      </div>
      <div className='bg-white rounded-md shadow-md py-16 px-20'>
        <div className='mb-5'>
          <div className='text-lg font-medium mb-4'>Images</div>
          <div className='border-gray-200 border-2 border-dashed p-4'>
            <div className='flex flex-wrap'>
              {renderImages()}
              <label
                htmlFor='imageUpload'
                className='flex items-center justify-center border-2 border-gray-200 cursor-pointer w-36 h-36'
              >
                <span className='text-6xl text-gray-20 text-gray-200 relative bottom-2'>
                  +
                </span>
              </label>
              <input
                type='file'
                id='imageUpload'
                className='hidden'
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div>
          <div className='text-lg font-medium mb-4'>Information</div>
          <div>
            <div className='flex flex-wrap'>
              <div className='mr-8 mb-2'>
                <label htmlFor='name' className='mr-2'>
                  Name:
                </label>
                <input
                  type='text'
                  id='name'
                  className='focus:outline-none border-gray-200 border-2'
                />
              </div>
              <div className='mr-8 mb-2'>
                <label htmlFor='type' className='mr-2'>
                  Type:
                </label>
                <select
                  name='type'
                  id='type'
                  className='appearance-none focus:outline-none border-gray-200 border-2 text-center px-2 cursor-pointer'
                >
                  <option value='laptop'>Laptop</option>
                  <option value='pc'>PC</option>
                  <option value='Accessory'>Accessory</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAdd
