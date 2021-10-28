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

export interface GetProductsData {
  productList: Product[]
  total: number
}

export interface ProductTableProps {
  products: Product[]
}

export interface LocationState {
  _id: string
}

export interface SelectedItem {
  selected: number
}

export interface ProductBody {
  name: string
  type: 'laptop' | 'pc' | 'accessory'
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

// const productSchema = Joi.object({
//   name: Joi.string().required(),
//   type: Joi.string().valid('laptop', 'pc', 'accessory').required(),
//   brand: Joi.string().required(),
//   subBrand: Joi.string().required(),
//   price: Joi.number().required(),
//   isSale: Joi.boolean().required(),
//   reducedPrice: Joi.number(),
//   images: Joi.array().items(Joi.string().base64()).min(1).required(),
//   quantity: Joi.number().required(),
//   cpu: Joi.object({ value: Joi.string().required(), text: Joi.string() }),
//   ram: Joi.object({ value: Joi.string().required(), text: Joi.string() }),
//   hardDrive: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   hardDriveNumber: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   monitorDimension: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   monitorRatio: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   monitorBackground: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   frequency: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   graphicsCard: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   graphicsMemory: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   weight: Joi.object({ value: Joi.string().required(), text: Joi.string() }),
//   resolution: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   accessoryType: Joi.object({
//     value: Joi.string().required(),
//     text: Joi.string(),
//   }),
//   extraDetail: Joi.array().items(
//     Joi.array().items(
//       Joi.object({
//         field: Joi.string().required(),
//         value: Joi.string().required(),
//       })
//     )
//   ),
// })
