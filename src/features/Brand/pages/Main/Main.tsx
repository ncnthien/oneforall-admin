import brandApi from 'apis/brandApi'
import { useEffect, useState } from 'react'
import BrandTable from 'features/Brand/components/BrandTable/BrandTable'
import { reduceBrandArray } from 'features/Brand/helper'
import { Brand } from 'features/Brand/interface'
import { AxiosResponse } from 'axios'

const Main: React.FC = () => {
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
      <div className='max-w-full'>
        <BrandTable brands={reduceBrandArray(brands as Brand[])} />
      </div>
    </div>
  )
}

export default Main
