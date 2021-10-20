export interface ReducedBrand {
  logo: string
  name: string
  summary: string
  _id: string
  value: string
}

export interface Brand extends ReducedBrand {
  banner: string
  __v: number
}

export interface CreatingBrand {
  logo: string
  name: string
  banner: string
  summary: string
}

export interface BrandTableProps {
  brands: ReducedBrand[]
  deleteBrand: (brandId: string, brandName: string) => void
}

export interface ReadMoreProps {
  more: string
  less: string
  lines: number
}

export interface LocationState {
  _id: string
}

export interface SubBrand {
  _id: string
  value: string
  name: string
  brand: string
}

export interface NewSubBrand {
  name: string
}

export interface SubBrandTableProps {
  subBrands: SubBrand[]
  addSubBrand: (newSubBrand: NewSubBrand) => void
  deleteSubBrand: (subBrandId: string, subBrandName: string) => void
}
