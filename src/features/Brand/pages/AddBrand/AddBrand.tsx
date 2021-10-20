import {
  convertToBase64,
  removeTag,
  checkFalsyKey,
} from 'features/Brand/helper'
import { CreatingBrand } from 'features/Brand/interface'
import { getClone, swal } from 'helper'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import brandApi from 'apis/brandApi'

const AddBrand: React.FC = () => {
  const namePlaceholder = 'Brand name'
  const summaryPlaceholder = 'Something about brand'
  const defaultCreatingBrand = {
    name: '',
    summary: '',
    logo: '',
    banner: '',
  }
  const [brand, setBrand] = useState<CreatingBrand>(defaultCreatingBrand)

  const handleFormChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return
    }

    const targetFile = event.target.files[0]
    const base64Image = await convertToBase64(targetFile)
    const newBrand = { ...brand, [event.target.name]: base64Image }

    setBrand(newBrand)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBrand = { ...brand, name: event.target.value }
    setBrand(newBrand)
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newBrand = { ...brand, summary: event.target.value }
    setBrand(newBrand)
  }

  const handleAddButtonClick = async () => {
    if (!checkFalsyKey(brand)) {
      return swal.fire(
        'Opps!',
        'There is some fields omitted, please fill out!',
        'error'
      )
    }

    try {
      const createdStatus = 201
      const clonedBrand = getClone(brand)

      // Remove tag to get only base64 string
      clonedBrand.logo = removeTag(brand.logo)
      clonedBrand.banner = removeTag(brand.banner)
      const { data: newBrand, status } = await brandApi.add(clonedBrand)
      if (status === createdStatus) {
        setBrand(newBrand)
        const result = await swal.fire(
          'Done!',
          `Adding new brand successfully`,
          'success'
        )

        if (result.isDismissed || result.isConfirmed) {
          setBrand(defaultCreatingBrand)
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let message = 'Adding new brand failed, please try again'
      if (error.response) {
        message = error.response.data
      }

      swal.fire('Opps!', message, 'error')
    }
  }

  return (
    <div>
      <div className='mb-8'>
        <Link
          to='/brand'
          className='text-white bg-cyan-400 py-2 px-4 rounded-md shadow-md hover:bg-cyan-500 transition-all'
        >
          Back
        </Link>
      </div>
      <div className='bg-white rounded-md shadow-md py-16 px-20'>
        <div className='flex items-center'>
          <div className='flex flex-col items-center w-1/2'>
            <img
              src={brand.logo}
              alt={brand.logo && brand.name}
              className='block mb-8'
            />
            <input
              type='file'
              id='logo'
              name='logo'
              className='hidden'
              onChange={handleFormChange}
            />
            <label
              htmlFor='logo'
              className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all text-sm block cursor-pointer'
            >
              New logo
            </label>
          </div>
          <div className='flex-grow'>
            <table className='w-full'>
              <tbody>
                <tr>
                  <td className='align-top py-2'>
                    <label>Name:</label>
                  </td>
                  <td className='align-top py-2'>
                    <input
                      type='text'
                      name='name'
                      className='border-2 border-gray-300 rounded-sm w-60 px-2 focus:outline-none'
                      value={brand.name}
                      onChange={handleNameChange}
                      placeholder={namePlaceholder}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='align-top py-2'>
                    <label htmlFor='banner'>Banner:</label>
                  </td>
                  <td className='align-top py-2'>
                    <input
                      type='file'
                      name='banner'
                      id='banner'
                      className='hidden'
                      onChange={handleFormChange}
                    />
                    <label htmlFor='banner' className='cursor-pointer'>
                      {brand.banner ? (
                        <img src={brand.banner} alt='' className='w-60' />
                      ) : (
                        <label
                          htmlFor='banner'
                          className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all text-sm w-60 cursor-pointer'
                        >
                          Update banner
                        </label>
                      )}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className='align-top py-2'>
                    <label>Summary:</label>
                  </td>
                  <td className='align-top py-2'>
                    <textarea
                      value={brand.summary}
                      name='summary'
                      className='border-2 border-gray-300 rounded-sm w-60 px-2 resize-none focus:outline-none'
                      rows={10}
                      onChange={handleTextAreaChange}
                      placeholder={summaryPlaceholder}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={handleAddButtonClick}
          className='block mx-auto mt-6 bg-green-400 text-white shadow-md rounded-md py-2 px-4 hover:bg-green-500 transition-all text-sm'
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default AddBrand
