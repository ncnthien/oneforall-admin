import * as Yup from 'yup'

export const productSchema = Yup.object({
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  subBrand: Yup.string().required('Required'),
  price: Yup.string()
    .matches(/^[0-9]+$/, 'Invalid')
    .required('Required'),
  isSale: Yup.boolean().required(),
  reducedPrice: Yup.number()
    .typeError('Invalid')
    .when('isSale', {
      is: true,
      then: Yup.number().required('Required'),
      otherwise: Yup.number().notRequired(),
    }),
  images: Yup.array().min(1),
  quantity: Yup.string()
    .matches(/^[0-9]+$/, 'Invalid')
    .required('Required'),
})
