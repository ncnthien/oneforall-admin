import { authApi } from 'apis/authApi'
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from 'formik'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import * as Yup from 'yup'
import { LoginFormData } from './interface'

const Main: React.FC = () => {
  const [error, setError] = useState<string>('')
  const history = useHistory()

  useEffect(() => {
    const jwtTokenKey = 'jwtToken'
    const token = localStorage.getItem(jwtTokenKey)

    if (token) {
      history.push('/event')
    }
  }, [])

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .min(4, 'At least 4 character')
      .max(40, 'Maximum is 40 character')
      .required('Username is required'),
    password: Yup.string()
      .min(4, 'At least 4 character')
      .max(40, 'Maximum is 40 character')
      .required('Password is required'),
  })

  const LoginFormData: LoginFormData = {
    email: 'admin@gmail.com',
    password: '123123',
  }

  const handleFormSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<LoginFormData>
  ) => {
    try {
      actions.setSubmitting(true)

      const data = { ...values } as LoginFormData

      const {
        data: {
          auth: { token },
        },
      } = await authApi.login(data)

      const jwtTokenKey = 'jwtToken'
      localStorage.setItem(jwtTokenKey, token)

      actions.setSubmitting(false)
      history.push('/event')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response.data)
    }
  }

  return (
    <div className='h-screen flex items-center bg-gray-100'>
      <div className=' w-96  p-6 mx-auto  border-gray-300 bg-white rounded-xl shadow flex items-center space-x-4'>
        <div className='w-full'>
          <div className='text-3xl font-medium text-center text-cyan-400 mb-6'>
            Dulichdi
          </div>
          <Formik
            initialValues={LoginFormData}
            onSubmit={handleFormSubmit}
            validationSchema={LoginSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className='flex flex-col mb-2'>
                  <label htmlFor='email' className='font-medium mb-2'>
                    Email
                  </label>
                  <Field
                    id='email'
                    name='email'
                    placeholder='Nh???p email'
                    className='outline-none	h-12 bg-gray-100 px-4 mb-2 rounded'
                  />
                  <ErrorMessage
                    name='email'
                    component='error'
                    className='text-red-400'
                  />
                </div>
                <div className='flex flex-col mb-2'>
                  <label htmlFor='password' className='font-medium mb-2'>
                    Password
                  </label>
                  <Field
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Nh???p password'
                    className='outline-none	h-12 bg-gray-100 px-4 mb-2 rounded'
                  />
                  <ErrorMessage
                    name='password'
                    component='error'
                    className='text-red-400'
                  />
                </div>
                <div className='text-red-400'> {error}</div>
                <div>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full h-10 bg-cyan-400 text-white rounded mt-2'
                  >
                    ????ng nh???p
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Main
