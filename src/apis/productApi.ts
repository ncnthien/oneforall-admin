import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import {
  AddingProduct,
  GetProductsData,
  GetDetailProductData,
  Product,
} from 'features/Product/interface'

const productApi = {
  getAll: (params: {
    page: number
    limit: number
  }): Promise<AxiosResponse<GetProductsData>> => {
    const url = `/api/tour`
    return axiosClient.get(url, { params })
  },
  getDetail: (
    productId: string
  ): Promise<AxiosResponse<GetDetailProductData>> => {
    const url = `/api/tour/${productId}`
    return axiosClient.get(url)
  },
  addProduct: (product: FormData) => {
    const url = '/api/admin/tour'
    return axiosClient.post(url, product)
  },
  updateProduct: (product: FormData, productId: string) => {
    const url = `/api/admin/tour/${productId}`
    return axiosClient.put(url, product)
  },
  delete: (productId: string): Promise<AxiosResponse> => {
    const url = `/api/admin/tour/${productId}`
    return axiosClient.delete(url)
  },
}

export default productApi
