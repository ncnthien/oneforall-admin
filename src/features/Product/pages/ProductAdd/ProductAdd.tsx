import { useEffect, useCallback, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import { removeTag, swal } from 'helper'
 
import {
  Brand, SubBrand
} from 'features/Brand/interface'
import brandApi from 'apis/brandApi';
import productApi from 'apis/productApi';
import { convertToBase64 } from 'helper'
import { initValue, listDetail } from './initValue';
import { productSchema } from './validationSchema';

const ProductAdd: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [subBrands, setSubBrands] = useState<SubBrand[]>([])

  const history = useHistory();

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: productSchema,
    onSubmit: (values) => {
      const imagesRemovedTag = values.images.map(img => removeTag(img))
      addProduct({...values, images: imagesRemovedTag})
    }
  })

  const { values, errors, handleChange, touched, handleSubmit, handleBlur, setFieldValue } = formik

  const fetchBrand = useCallback(async() => {
    try {
      const { data }  = await brandApi.getAll();
      setBrands(data);
      setFieldValue('brand', data[0]?._id)
    } catch (error) {
      console.log(error);
    }
  }, [])

  const fetchSubBrand = useCallback(async(brandId) => {
    try {
      const { data }  = await brandApi.getAllSubBrand(brandId);
      setSubBrands(data);
      setFieldValue('subBrand', data[0]?._id)
    } catch (error) {
      console.log(error);
    }
  }, [])

  const addProduct = useCallback(async(values) => {
    try {
      await productApi.addProduct(values);
      swal.fire('Done!', `Add new product successfully`, 'success').then(() => {
        history.push('/product');
      });
    } catch (error) {
      swal.fire('Opps!', 'Something went wrong :(', 'error')
    }
  }, [])
  
  const renderImages = (): JSX.Element[] =>
    values.images.map((image, index) => (
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
    setFieldValue('images', [...values.images, base64Image])
  }

  useEffect(() => {
    fetchBrand()
  }, [])

  useEffect(() => {
    if (values.brand) {
      fetchSubBrand(values.brand)
    }
  }, [values.brand])

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
        <form onSubmit={handleSubmit}>
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
                <div className='mr-8 mb-2 mt-3'>
                  <label htmlFor='name' className='mr-2'>
                    Name:
                  </label>
                  <input
                    type='text'
                    name="name"
                    className='focus:outline-none border-gray-200 border-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && <p className="text-red-400">{errors.name}</p>}
                </div>

                <div className='mr-8 mb-2 mt-3'>
                  <label htmlFor='name' className='mr-2'>
                    Price:
                  </label>
                  <input
                    type='text'
                    name="price"
                    className='focus:outline-none border-gray-200 border-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.price && touched.price && <p className="text-red-400">{errors.price}</p>}
                </div>

                <div className='mr-8 mb-2 mt-3'>
                  <label htmlFor='name' className='mr-2'>
                    Quantity:
                  </label>
                  <input
                    type='text'
                    name="quantity"
                    className='focus:outline-none border-gray-200 border-2'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.quantity && touched.quantity && <p className="text-red-400">{errors.quantity}</p>}
                </div>

                <div className='mr-8 mb-2 mt-3'>
                  <label htmlFor='type' className='mr-2'>
                    Type:
                  </label>
                  <select
                    name='type'
                    id='type'
                    className='appearance-none focus:outline-none border-gray-200 border-2 text-center px-2 cursor-pointer'
                    onChange={handleChange}
                  >
                    <option value='laptop'>Laptop</option>
                    <option value='pc'>PC</option>
                    <option value='accessory'>Accessory</option>
                  </select>
                </div>

                <div className='mr-8 mb-2 mt-3'>
                  <label htmlFor='type' className='mr-2'>
                    Brand:
                  </label>
                  <select
                    name='brand'
                    id='brand'
                    className='appearance-none focus:outline-none border-gray-200 border-2 text-center px-2 cursor-pointer'
                    onChange={handleChange}
                  >
                    {brands.map((brand, index) => <option key={index} value={brand._id}>{brand.name}</option>)}
                  </select>
                </div>

                <div className='mr-8 mb-2 mt-3'>
                  <label htmlFor='type' className='mr-2'>
                    Sub brand:
                  </label>
                  <select
                    name='subBrand'
                    id='subBrand'
                    className='appearance-none focus:outline-none border-gray-200 border-2 text-center px-2 cursor-pointer'
                    onChange={handleChange}
                  >
                    {subBrands.map((s, index) => <option key={index} value={s.value}>{s.name}</option>)}
                  </select>
                </div>

                <div className="flex flex-wrap mt-3">
                  {listDetail.map((item) => (
                    <div className='mb-2 w-1/2' key={item.id}>
                      <div className="flex">
                        <div className='mr-8 mb-2 mt-3 w-full'>
                          <label htmlFor={item.id} className='mr-2 block'>
                            {item.name}:
                          </label>
                          <div className="flex">
                            <select
                              name={item.name}
                              id={item.id}
                              className='appearance-none focus:outline-none border-gray-200 border-2 text-center px-2 cursor-pointer block w-60'
                              onChange={(e) => setFieldValue(item.id, {
                                ...(values as any)[item.id],
                                value: e.target.value
                              })}
                            >
                              <option value="" disabled selected>None</option>
                              {item.items.map((i, index) => <option key={index} value={i.value}>{i.name}</option>)}
                            </select>
                            <input
                              type='text'
                              name="name"
                              className='focus:outline-none border-gray-200 border-2 ml-3 w-3/4'
                              onChange={(e) => setFieldValue(item.id, {
                                ...(values as any)[item.id],
                                text: e.target.value
                              })}
                            />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="p-3 bg-cyan-400 hover:bg-cyan-500 transition-all text-white rounded-md m-auto w-60 block">Tạo sản phẩm</button>
        </form>
      </div>
    </div>
  )
}

export default ProductAdd
