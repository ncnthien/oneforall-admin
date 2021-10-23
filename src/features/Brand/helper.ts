import { Brand, ReducedBrand } from 'features/Brand/interface'

export const reduceBrandArray = (brands: Brand[]): ReducedBrand[] => {
  return brands.map(({ logo, name, summary, _id, value }) => ({
    logo,
    name,
    summary,
    _id,
    value,
  }))
}
