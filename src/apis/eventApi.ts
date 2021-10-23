import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import { Event, CreatingEvent } from 'features/Event/interface'

const eventApi = {
  getAll: (): Promise<AxiosResponse<Event[]>> => {
    const url = '/api/admin/event'
    return axiosClient.get(url)
  },

  get: (eventId: string): Promise<AxiosResponse<Event>> => {
    const url = `/api/admin/event/${eventId}`
    return axiosClient.get(url)
  },

  update: (eventId: string, data: Event): Promise<AxiosResponse<Event>> => {
    const url = `/api/admin/event/${eventId}/update`
    return axiosClient.put(url, data)
  },

  add: (data: CreatingEvent): Promise<AxiosResponse<Event>> => {
    const url = `/api/admin/event/`
    return axiosClient.post(url, data)
  },

  delete: (eventId: string): Promise<AxiosResponse> => {
    const url = `/api/admin/event/${eventId}/delete`
    return axiosClient.delete(url)
  },
}

export default eventApi
