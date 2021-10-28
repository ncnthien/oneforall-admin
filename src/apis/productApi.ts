import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import { GetProductsData } from 'features/Product/interface'

const productApi = {
  getAll: (
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<GetProductsData>> => {
    const url = `/api/admin/product?${page ? `page=${page}` : ''}${
      limit ? `&limit=${limit}` : ''
    }`
    return axiosClient.get(url)
  },
}

export default productApi
