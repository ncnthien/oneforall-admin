import { AxiosResponse } from 'axios'
import { LoginFormData } from 'features/Login/pages/Main/interface'
import axiosClient from './axiosClient'

export interface TokenData {
  auth: {
    token: string
  }
}

export const authApi = {
  login: (data: LoginFormData): Promise<AxiosResponse<TokenData>> => {
    const url = '/auth/login'
    return axiosClient.post(url, data)
  },
}
