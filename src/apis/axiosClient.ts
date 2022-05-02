import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import queryString from 'qs'
import { useHistory } from 'react-router-dom'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
})

const jwtTokenKey = 'jwtToken'

export const AxiosSetupInterceptors: React.FC = () => {
  const history = useHistory()

  axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(jwtTokenKey) || ''

    if (config.headers) {
      config.headers['x-access-token'] = token
    }

    return config
  })

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response) {
        const { status } = error.response

        if (status === 401 || status === 403) {
          localStorage.removeItem(jwtTokenKey)
          history.push('/login')
        }

        throw error
      }
    }
  )

  return null
}

export default axiosClient
