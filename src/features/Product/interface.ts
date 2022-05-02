interface Detail {
  value: string
  text?: string
}

interface ExtraDetail {
  field: string
  value: string
}

export interface AddingProduct {
  photos: File[] | FormData
  title: string
  description: string
  location: string
  price: number
  schedule: string
  departureTime: string
  transport: string
  availableSlot: number
}

export interface DefaultAddingProduct {
  title: string
  description: string
  location: string
  price: number
  schedule: string
  departureTime: string
  transport: string
  availableSlot: number
  image?: null | File
}

export interface Product {
  images: string[]
  _id: string
  image?: File | null
  title: string
  description: string
  location: string
  price: number
  schedule: string
  departureTime: string
  transport: string
  availableSlot: number
  __v: number
  updatedAt: string
  createdAt: string
  photos?: File
}

export interface GetDetailProductData {
  data: Product
}

export interface GetProductsData {
  data: Product[]
  pagination: {
    limit: number
    page: number
    total: number
  }
}

export interface ProductTableProps {
  products: Product[]
  deleteProduct: (productId: string) => void
}

export interface LocationState {
  _id: string
}

export interface SelectedItem {
  selected: number
}

export type ProductType = 'laptop' | 'pc' | 'accessory'

export interface ProductBody {
  name: string
  type: ProductType
  brand: string
  subBrand: string
  price: number
  isSale: boolean
  reducedPrice?: number
  images: string[]
  quantity: number
  cpu?: Detail
  ram?: Detail
  hardDrive?: Detail
  hardDriveNumber?: Detail
  monitorDimension?: Detail
  monitorRatio?: Detail
  monitorBackground?: Detail
  frequency?: Detail
  graphicsCard?: Detail
  graphicsMemory?: Detail
  weight?: Detail
  resolution?: Detail
  accessoryType?: Detail
  extraDetail?: ExtraDetail[]
}
