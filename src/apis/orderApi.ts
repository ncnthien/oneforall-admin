import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import { GetOrdersData, UpdateOrderData } from 'features/Order/interface'

const orderApi = {
  getAll: (): Promise<AxiosResponse<GetOrdersData>> => {
    const url = '/api/bill'
    return axiosClient.get(url)
  },

  update: (
    orderId: string,
    userId: string,
    orderStatus: string
  ): Promise<AxiosResponse<UpdateOrderData>> => {
    const url = `/api/bill/${orderId}`
    return axiosClient.put(url, { userId, status: orderStatus })
  },

  delete: (orderId: string): Promise<AxiosResponse> => {
    const url = `/api/bill/${orderId}`
    return axiosClient.delete(url)
  },
}

export default orderApi
