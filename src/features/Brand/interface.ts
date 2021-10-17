export interface reducedBrand {
  logo: string
  name: string
  summary: string
  _id: string
}

export interface Brand extends reducedBrand {
  banner: string
  value: string
  __v: number
}

export interface BrandTableProps {
  brands: reducedBrand[]
}

export interface ReadMoreProps {
  more: string
  less: string
  lines: number
}
