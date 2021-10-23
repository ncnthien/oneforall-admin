import brandApi from 'apis/brandApi'
import { SubBrandTable } from 'features/Brand/components'
import { convertToBase64, removeTag } from 'helper'
import {
  Brand,
  LocationState,
  NewSubBrand,
  SubBrand,
} from 'features/Brand/interface'
import { getClone, swal } from 'helper'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const DetailBrand: React.FC = () => {
  const { state } = useLocation<LocationState>()
  const [brand, setBrand] = useState<Brand | null>(null)
  const [subBrands, setSubBrands] = useState<SubBrand[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const [{ data: brand }, { data: subBrands }] = await Promise.all([
          brandApi.get(state._id),
          brandApi.getAllSubBrand(state._id),
        ])

        setBrand(brand)
        setSubBrands(subBrands)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBrands()
  }, [])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBrand = { ...brand, name: event.target.value }
    setBrand(newBrand as Brand)
  }

  const handleFormChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return
    }

    const targetFile = event.target.files[0]
    const base64Image = await convertToBase64(targetFile)
    const newBrand = { ...brand, [event.target.name]: base64Image }

    setBrand(newBrand as Brand)
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newBrand = { ...brand, summary: event.target.value }
    setBrand(newBrand as Brand)
  }

  const handleAddNewSubBrand = async (newSubBrand: NewSubBrand) => {
    try {
      const createdStatus = 201
      const { data: createdSubBrand, status } = await brandApi.addSubBrand(
        state._id,
        newSubBrand
      )

      if (status === createdStatus) {
        const clonedSubBrands = getClone(subBrands)
        clonedSubBrands.push(createdSubBrand)
        setSubBrands(clonedSubBrands)

        swal.fire('Done!', `Adding successfully`, 'success')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let message = 'Adding new sub brand failed, please try again'
      if (error.response) {
        message = error.response.data
      }

      swal.fire('Opps!', message, 'error')
    }
  }

  const handleDeleteSubBrand = (subBrandId: string, subBrandName: string) => {
    swal
      .fire({
        title: `Are you sure to delete sub brand ${subBrandName}`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      })
      .then(async result => {
        if (result.isConfirmed) {
          try {
            const okStatus = 200
            const { status } = await brandApi.deleteSubBrand(subBrandId)
            if (status === okStatus) {
              swal.fire(
                'Deleted!',
                `Delete ${subBrandName} successfully`,
                'success'
              )

              const clonedSubBrands = getClone(subBrands)
              const newSubBrands = clonedSubBrands.filter(
                brand => brand._id !== subBrandId
              )
              setSubBrands(newSubBrands)
            }
          } catch (error) {
            swal.fire(
              'Opps!',
              `Delete ${subBrandName} failed, please try again!`,
              'error'
            )
          }
        }
      })
  }

  const handleUpdateButtonClick = async () => {
    if (!brand) {
      return
    }

    try {
      const okStatus = 200
      const clonedBrand = getClone(brand)

      // Remove tag to get only base64 string
      clonedBrand.logo = removeTag(brand.logo)
      clonedBrand.banner = removeTag(brand.banner)
      const { data: newBrand, status } = await brandApi.update(clonedBrand)
      if (status === okStatus) {
        setBrand(newBrand)
        swal.fire('Done!', `Updaing successfully`, 'success')
      }
    } catch (error) {
      swal.fire('Oops!', `Updaing failed, please try again!`, 'error')
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
              src={brand ? (brand as Brand).logo : ''}
              alt={brand ? (brand as Brand).name : ''}
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
                      value={brand ? (brand as Brand).name : ''}
                      onChange={handleNameChange}
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
                      <img
                        src={brand ? (brand as Brand).banner : ''}
                        alt=''
                        className='w-60'
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className='align-top py-2'>
                    <label>Summary:</label>
                  </td>
                  <td className='align-top py-2'>
                    <textarea
                      value={brand ? (brand as Brand).summary : ''}
                      name='summary'
                      className='border-2 border-gray-300 rounded-sm w-60 px-2 resize-none focus:outline-none'
                      rows={10}
                      onChange={handleTextAreaChange}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td className='align-top py-2'>
                    <label>Sub brands:</label>
                  </td>
                  <td className='align-top py-2'>
                    <SubBrandTable
                      subBrands={subBrands}
                      addSubBrand={handleAddNewSubBrand}
                      deleteSubBrand={handleDeleteSubBrand}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={handleUpdateButtonClick}
          className='block mx-auto mt-6 bg-green-400 text-white shadow-md rounded-md py-2 px-4 hover:bg-green-500 transition-all text-sm'
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default DetailBrand
