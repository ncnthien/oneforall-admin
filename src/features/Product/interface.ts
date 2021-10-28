interface Detail {
  value: string
  text?: string
}

interface ExtraDetail {
  field: string
  value: string
}

export interface Product {
  _id: string
  name: string
  type: 'laptop' | 'pc' | 'accessory'
  brand: string
  subBrand: string
  price: number | string
  isSale: boolean
  reducedPrice?: number
  images: string[]
  quantity: number | string
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

export interface GetProductsData {
  productList: Product[]
  total: number
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
