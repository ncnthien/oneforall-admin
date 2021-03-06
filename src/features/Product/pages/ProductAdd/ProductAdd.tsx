import { Link, useHistory } from 'react-router-dom'

import productApi from 'apis/productApi'
import { useFormik } from 'formik'
import { swal } from 'helper'
import { useCallback, useState } from 'react'
import { productSchema } from './validationSchema'
import { AddingProduct, DefaultAddingProduct } from 'features/Product/interface'
import { serialize } from 'object-to-formdata'

const defaultProduct: DefaultAddingProduct = {
  title: '',
  description: '',
  location: '',
  price: 1,
  schedule: '',
  departureTime: '',
  transport: '',
  availableSlot: 1,
  image: null,
}

const ProductAdd: React.FC = () => {
  const history = useHistory()

  const {
    errors,
    handleChange,
    touched,
    handleSubmit,
    handleBlur,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: defaultProduct,
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: submittedValues => {
      const addingProduct = {
        ...submittedValues,
        photos: submittedValues.image as File,
      }

      delete addingProduct.image

      const formData = serialize(addingProduct)

      addProduct(formData)
    },
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    setFieldValue('image', e.target.files[0])
  }

  const addProduct = useCallback(async (values: FormData) => {
    try {
      await productApi.addProduct(values)
      swal.fire('Xong!', `Thêm tour thành công!`, 'success').then(() => {
        history.push('/tour')
      })
    } catch (error) {
      swal.fire('Opps!', 'Có lỗi gì đó, vui lòng thử lại :(', 'error')
    }
  }, [])

  return (
    <div>
      <div className='mb-8'>
        <Link
          to='/tour'
          className='text-white bg-cyan-400 py-2 px-4 rounded-md shadow-md hover:bg-cyan-500 transition-all'
        >
          Trở về
        </Link>
      </div>
      <div className='bg-white rounded-md shadow-md py-16 px-20'>
        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <div className='text-lg font-medium mb-4'>Ảnh</div>
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
            <div className='text-lg font-medium mb-4'>Thông tin tour</div>
            <div>
              <div className='flex flex-wrap'>
                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='title' className='mr-2'>
                    Tên:
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
                    Giá:
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
                    Số chỗ:
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
                    Địa điểm:
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
                    Lịch trình:
                  </label>
                  <input
                    type='text'
                    name='schedule'
                    id='schedule'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    placeholder='2 ngày 1 đêm'
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
                    Phương tiện:
                  </label>
                  <input
                    type='text'
                    name='transport'
                    id='transport'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.transport}
                    placeholder='Xe buýt'
                  />
                  {errors.transport && touched.transport && (
                    <p className='text-red-400'>{errors.transport}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='departureTime' className='mr-2'>
                    Ngày khởi hành:
                  </label>
                  <input
                    type='date'
                    name='departureTime'
                    id='departureTime'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.departureTime}
                    placeholder='Xe buýt'
                  />
                  {errors.departureTime && touched.departureTime && (
                    <p className='text-red-400'>{errors.departureTime}</p>
                  )}
                </div>

                <div className='mb-2 mt-2 pr-3 w-1/2'>
                  <label htmlFor='description' className='mr-2'>
                    Mô tả:
                  </label>
                  <textarea
                    name='description'
                    id='description'
                    className='focus:outline-none border-gray-200 border-2 w-full p-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder='Xe buýt'
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
            Tạo tour
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductAdd
