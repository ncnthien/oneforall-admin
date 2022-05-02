import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import { User } from 'features/User/interface'

const userApi = {
  getAll: (): Promise<AxiosResponse<{ data: User[] }>> => {
    const url = '/api/admin/user'
    return axiosClient.get(url)
  },

  search: (query: string): Promise<AxiosResponse<User[]>> => {
    const url = `/api/admin/user/search?q=${query}`
    return axiosClient.post(url)
  },

  block: (user: User): Promise<AxiosResponse> => {
    const url = `/api/admin/user/${user._id}`
    return axiosClient.put(url, user)
  },
}

export default userApi
