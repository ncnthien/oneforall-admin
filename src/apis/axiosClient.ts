import axios from 'axios'

const authTokenKey = 'authToken'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

// Handle token.
const authToken = localStorage.getItem(authTokenKey)

if (authToken) {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
} else {
  axiosClient.defaults.headers.common['Authorization'] = ''
}

axiosClient.interceptors.request.use(async config => {
  return config
})

axiosClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Check if response is unauth or forbidden.
    const status = error.response.status
    if (status === 401 || status === 403) {
      // localStorage.removeItem(authTokenKey)
      axiosClient.defaults.headers.common['Authorization'] = ''
    }

    throw error
  }
)

export default axiosClient
