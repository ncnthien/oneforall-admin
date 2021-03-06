import productApi from 'apis/productApi'
import { Product } from 'features/Product/interface'
import { useFormik } from 'formik'
import { swal } from 'helper'
import { serialize } from 'object-to-formdata'
import { useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { productSchema } from './validationSchema'

const defaultProduct: Product = {
  title: '',
  description: '',
  location: '',
  price: 1,
  schedule: '',
  departureTime: '',
  transport: '',
  availableSlot: 1,
  image: null,
  images: [],
  _id: '',
  __v: 0,
  updatedAt: '',
  createdAt: '',
}

const ProductAdd: React.FC = () => {
  const history = useHistory()
  const [product, setProduct] = useState<Product>(defaultProduct)
  const { productId } = useParams<{ productId: string }>()

  const { errors, handleChange, touched, handleSubmit, handleBlur, values } =
    useFormik({
      initialValues: product,
      enableReinitialize: true,
      validationSchema: productSchema,
      onSubmit: submittedValues => {
        if (submittedValues.image) {
          submittedValues.photos = submittedValues.image
        }
        delete submittedValues.image
        const formData = serialize(submittedValues)

        updateProduct(formData, submittedValues._id)
      },
    })

  useEffect(() => {
    const fetchDetailTour = async () => {
      try {
        const {
          data: { data: currentProduct },
        } = await productApi.getDetail(productId)

        currentProduct.image = null

        setProduct(currentProduct)
      } catch (error) {
        console.log(error)
      }
    }

    fetchDetailTour()
  }, [productId])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    const targetFile = e.target.files[0]
    const newProduct = { ...product, image: targetFile }

    setProduct(newProduct)
  }

  const updateProduct = useCallback(
    async (product: FormData, productId: string) => {
      try {
        await productApi.updateProduct(product, productId)
        swal.fire('Xong!', `Th??m tour th??nh c??ng!`, 'success').then(() => {
          history.push('/tour')
        })
      } catch (error) {
        swal.fire('Opps!', 'C?? l???i g?? ????, vui l??ng th??? l???i :(', 'error')
      }
    },
    []
  )

  return (
    <div>
      <div className='mb-8'>
        <Link
          to='/tour'
          className='text-white bg-cyan-400 py-2 px-4 rounded-md shadow-md hover:bg-cyan-500 transition-all'
        >
          Tr??? v???
        </Link>
      </div>
      <div className='bg-white rounded-md shadow-md py-16 px-20'>
        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <div className='text-lg font-medium mb-4'>???nh</div>
            <div className='flex flex-wrap'>
              <input
                type='file'
                id='imageUpload'
                name='image'
                onChange={handleFileChange}
              />
              {errors.image && touched.image && (
                <p className='text-red-400'>{errors.image}</p>
              )}
            </div>
          </div>
          <div>
            <div className='text-lg font-medium mb-4'>Th??ng tin tour</div>
            <div>
              <div className='flex flex-wrap'>
                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='title' className='mr-2'>
                    T??n:
                  </label>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  {errors.title && touched.title && (
                    <p className='text-red-400'>{errors.title}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='price' className='mr-2'>
                    Gi??:
                  </label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    min={1}
                  />
                  {errors.price && touched.price && (
                    <p className='text-red-400'>{errors.price}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='availableSlot' className='mr-2'>
                    S??? ch???:
                  </label>
                  <input
                    type='number'
                    name='availableSlot'
                    id='availableSlot'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.availableSlot}
                    min={1}
                  />
                  {errors.availableSlot && touched.availableSlot && (
                    <p className='text-red-400'>{errors.availableSlot}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='location' className='mr-2'>
                    ?????a ??i???m:
                  </label>
                  <input
                    type='text'
                    name='location'
                    id='location'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                  />
                  {errors.location && touched.location && (
                    <p className='text-red-400'>{errors.location}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='schedule' className='mr-2'>
                    L???ch tr??nh:
                  </label>
                  <input
                    type='text'
                    name='schedule'
                    id='schedule'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    placeholder='2 ng??y 1 ????m'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.schedule}
                  />
                  {errors.schedule && touched.schedule && (
                    <p className='text-red-400'>{errors.schedule}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='transport' className='mr-2'>
                    Ph????ng ti???n:
                  </label>
                  <input
                    type='text'
                    name='transport'
                    id='transport'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.transport}
                    placeholder='Xe bu??t'
                  />
                  {errors.transport && touched.transport && (
                    <p className='text-red-400'>{errors.transport}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='departureTime' className='mr-2'>
                    Ng??y kh???i h??nh:
                  </label>
                  <input
                    type='date'
                    name='departureTime'
                    id='departureTime'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.departureTime}
                    placeholder='Xe bu??t'
                  />
                  {errors.departureTime && touched.departureTime && (
                    <p className='text-red-400'>{errors.departureTime}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='description' className='mr-2'>
                    M?? t???:
                  </label>
                  <textarea
                    name='description'
                    id='description'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder='Xe bu??t'
                  />
                  {errors.description && touched.description && (
                    <p className='text-red-400'>{errors.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='p-3 bg-cyan-400 hover:bg-cyan-500 transition-all text-white rounded-md m-auto w-60 block'
          >
            C???p nh???t tour
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductAdd
