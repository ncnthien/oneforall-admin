import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import { GetOrdersData, UpdateOrderData } from 'features/Order/interface'

const orderApi = {
  getAll: (): Promise<AxiosResponse<GetOrdersData>> => {
    const url = '/api/admin/order'
    return axiosClient.get(url)
  },

  update: (
    orderId: string,
    orderStatus: string
  ): Promise<AxiosResponse<UpdateOrderData>> => {
    const url = `/api/admin/order/${orderId}/update`
    return axiosClient.patch(url, { status: orderStatus })
  },

  delete: (orderId: string): Promise<AxiosResponse> => {
    const url = `/api/admin/order/${orderId}/delete`
    return axiosClient.delete(url)
  },
}

export default orderApi
