import brandApi from 'apis/brandApi'
import { AxiosResponse } from 'axios'
import BrandTable from 'features/Brand/components/BrandTable/BrandTable'
import { reduceBrandArray } from 'features/Brand/helper'
import { Brand } from 'features/Brand/interface'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'components'

const Main: React.FC = () => {
  const inputPlaceholder = 'Find your brand...'
  const debounceTime = 500
  const [brands, setBrands] = useState<AxiosResponse | Brand[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await brandApi.getAll()
        setBrands(brands)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBrands()
  }, [])

  return (
    <div className='max-w-full'>
      <div className='flex justify-between mb-8'>
        <DebounceInput
          time={debounceTime}
          handleOnChangeProps={() => {
            console.log('trigger debounce function')
          }}
          placeholder={inputPlaceholder}
        />
        <Link
          to='/brand/add'
          className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all'
        >
          New brand
        </Link>
      </div>
      <div className='max-w-full'>
        <BrandTable brands={reduceBrandArray(brands as Brand[])} />
      </div>
    </div>
  )
}

export default Main
