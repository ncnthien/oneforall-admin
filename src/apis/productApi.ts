import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import { GetProductsData, Product } from 'features/Product/interface'

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
  addProduct: (product: Omit<Product, '_id'>) => {
    const url = '/api/admin/product'
    return axiosClient.post(url, product)
  },
  delete: (productId: string): Promise<AxiosResponse> => {
    const url = `/api/admin/product/${productId}/delete`
    return axiosClient.delete(url)
  },
}

export default productApi
