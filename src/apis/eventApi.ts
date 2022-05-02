import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import {
  Event,
  CreatingEvent,
  EventsResponse,
  EventResponse,
} from 'features/Event/interface'

const eventApi = {
  getAll: (): Promise<AxiosResponse<EventsResponse>> => {
    const url = '/api/banner'
    return axiosClient.get(url)
  },

  get: (eventId: string): Promise<AxiosResponse<EventResponse>> => {
    const url = `/api/banner/${eventId}`
    return axiosClient.get(url)
  },

  update: (eventId: string, data: FormData): Promise<AxiosResponse<Event>> => {
    const url = `/api/admin/banner/${eventId}`
    return axiosClient.put(url, data)
  },

  add: (data: FormData): Promise<AxiosResponse<Event>> => {
    const url = `/api/admin/banner`
    return axiosClient.post(url, data)
  },

  delete: (bannerId: string): Promise<AxiosResponse> => {
    const url = `/api/admin/banner/${bannerId}`
    return axiosClient.delete(url)
  },
}

export default eventApi
