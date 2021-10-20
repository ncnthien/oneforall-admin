import axiosClient from 'apis/axiosClient'
import { AxiosResponse } from 'axios'
import {
  Brand,
  SubBrand,
  NewSubBrand,
  CreatingBrand,
} from 'features/Brand/interface'

const brandApi = {
  getAll: (): Promise<AxiosResponse<Brand[]>> => {
    const url = '/api/admin/brand'
    return axiosClient.get(url)
  },

  get: (id: string): Promise<AxiosResponse<Brand>> => {
    const url = `/api/admin/brand/${id}`
    return axiosClient.get(url)
  },

  add: (brand: CreatingBrand): Promise<AxiosResponse<Brand>> => {
    const url = `/api/admin/brand`
    return axiosClient.post(url, brand)
  },

  update: (brand: Brand): Promise<AxiosResponse<Brand>> => {
    const url = `/api/admin/brand/${brand._id}/update`
    return axiosClient.put(url, brand)
  },

  delete: (id: string): Promise<AxiosResponse> => {
    const url = `/api/admin/brand/${id}/delete`
    return axiosClient.delete(url)
  },

  getAllSubBrand: (brandId: string): Promise<AxiosResponse<SubBrand[]>> => {
    const url = `/api/admin/sub-brand/${brandId}`
    return axiosClient.get(url)
  },

  addSubBrand: (
    brandId: string,
    subBrand: NewSubBrand
  ): Promise<AxiosResponse<SubBrand>> => {
    const url = `/api/admin/sub-brand/${brandId}`
    return axiosClient.post(url, subBrand)
  },

  deleteSubBrand: (subBrandId: string): Promise<AxiosResponse> => {
    const url = `/api/admin/sub-brand/${subBrandId}/delete`
    return axiosClient.delete(url)
  },
}

export default brandApi
