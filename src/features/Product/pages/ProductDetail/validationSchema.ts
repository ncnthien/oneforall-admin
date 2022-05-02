import * as Yup from 'yup'

const FILE_SIZE = 10000000
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

export const productSchema = Yup.object({
  title: Yup.string().required('Không được để trống'),
  image: Yup.mixed()
    .test('imageEmpty', 'Ảnh không được để trống', value => {
      if (value === null) return false

      return true
    })
    .test('imageSize', 'thumbnail image is too large', value => {
      if (typeof value === 'string') {
        return true
      }

      return value && value.size <= FILE_SIZE
    })
    .test('iamgeType', 'thumbnail file is not suitable', value => {
      if (typeof value === 'string') {
        return true
      }

      return value && SUPPORTED_FORMATS.includes(value.type)
    }),
  description: Yup.string()
    .min(6, 'Phải ít nhất 6 kí tự')
    .max(50, 'Không được vượt quá 50 kít tự')
    .required('Không được để trống'),
  location: Yup.string()
    .min(6, 'Phải ít nhất 6 kí tự')
    .max(20, 'Không được vượt quá 20 kít tự')
    .required('Không được để trống'),
  price: Yup.number()
    .min(1, 'Phải ít nhất là 1 đồng')
    .required('Không được để trống'),
  schedule: Yup.string()
    .min(6, 'Phải ít nhất 6 kí tự')
    .max(20, 'Không được vượt quá 20 kít tự')
    .required('Không được để trống'),
  departureTime: Yup.string().required('Không được để trống'),
  transport: Yup.string()
    .min(6, 'Phải ít nhất 6 kí tự')
    .max(20, 'Không được vượt quá 20 kít tự')
    .required('Không được để trống'),
  availableSlot: Yup.number()
    .min(1, 'Phải ít nhất là 1 đồng')
    .required('Không được để trống'),
})
