import { AxiosResponse } from 'axios'
import { LoginFormData } from 'features/Login/pages/Main/interface'
import axiosClient from './axiosClient'

export interface TokenData {
  token: string
}

export const authApi = {
  login: (data: LoginFormData): Promise<AxiosResponse<TokenData>> => {
    const url = 'api/admin/auth/login'
    return axiosClient.post(url, data)
  },
}
