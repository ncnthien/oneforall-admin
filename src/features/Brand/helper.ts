import { Brand, CreatingBrand, ReducedBrand } from 'features/Brand/interface'

export const reduceBrandArray = (brands: Brand[]): ReducedBrand[] => {
  return brands.map(({ logo, name, summary, _id, value }) => ({
    logo,
    name,
    summary,
    _id,
    value,
  }))
}

export const convertToBase64 = (
  file: Blob
): Promise<string | ProgressEvent<FileReader>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = error => {
      reject(error)
    }
  })
}

export const removeTag = (base64StringWithTag: string): string => {
  const start = base64StringWithTag.indexOf(',') + 1
  if (start === 0) {
    return base64StringWithTag
  }

  const base64StringWithoutTag = base64StringWithTag.substr(start)
  return base64StringWithoutTag
}

export const checkFalsyKey = (brand: CreatingBrand): boolean => {
  let result = true
  Object.entries(brand).forEach(([, value]) => {
    if (!value) {
      result = false
    }
  })

  return result
}
