import { Brand, reducedBrand } from 'features/Brand/interface'

export const reduceBrandArray = (brands: Brand[]): reducedBrand[] => {
  return brands.map(({ logo, name, summary, _id }) => ({
    logo,
    name,
    summary,
    _id,
  }))
}
