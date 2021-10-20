import brandApi from 'apis/brandApi'
import BrandTable from 'features/Brand/components/BrandTable/BrandTable'
import { reduceBrandArray } from 'features/Brand/helper'
import { Brand } from 'features/Brand/interface'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { swal, getClone } from 'helper'

const Main: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data: brands } = await brandApi.getAll()
        setBrands(brands)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBrands()
  }, [])

  const deleteBrand = async (brandId: string, brandName: string) => {
    try {
      const okStatus = 200
      const { status } = await brandApi.delete(brandId)
      if (status === okStatus) {
        swal.fire('Deleted!', `Delete ${brandName} successfully`, 'success')

        const clonedBrands = getClone(brands)
        const newSubBrands = clonedBrands.filter(brand => brand._id !== brandId)
        setBrands(newSubBrands)
      }
    } catch (error) {
      swal.fire(
        'Opps!',
        `Delete ${brandName} failed, please try again!`,
        'error'
      )
    }
  }

  return (
    <div className='max-w-full'>
      <div className='flex justify-end mb-8'>
        <Link
          to='/brand/add'
          className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all'
        >
          New brand
        </Link>
      </div>
      <div className='max-w-full'>
        <BrandTable
          brands={reduceBrandArray(brands)}
          deleteBrand={deleteBrand}
        />
      </div>
    </div>
  )
}

export default Main
