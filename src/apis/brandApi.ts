import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import { Brand } from 'features/Brand/interface'

const brandApi = {
  getAll: (): Promise<AxiosResponse<Brand[]>> => {
    const url = '/api/admin/brand'
    return axiosClient.get<Brand[]>(url)
  },
}

export default brandApi
