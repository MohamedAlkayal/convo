import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
import InputFormik from '../components/auth/InputFormik'
import AuthCover from '../components/auth/AuthCover'
import { ax } from '../utilities/axios.config'
import axios, { AxiosError } from 'axios'
import ErrorResponse from '../interfaces/DTOs/ErrorResponseDTO'

interface FormValues {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required')
  })

  // Initial form values
  const initialValues: FormValues = {
    email: '',
    password: ''
  }

  // Form submission handler
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await ax.post('/auth/login', values)
      localStorage.setItem('token', res.data.token)
      actions.resetForm()
      navigate('/chat')
    } catch (err) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError
        if (axiosError.response) {
          const resErr = axiosError.response.data as ErrorResponse
          if (resErr.message) {
            actions.setStatus(resErr.message)
            return
          }
        }
      }
    }
  }

  return (
    <div className="flex bg-dark h-screen min-h-[740px]">
      <div className="relative flex flex-col justify-center items-center gap-16 p-10 w-full md:w-1/2 h-full">
        <div className="absolute top-0 w-16 h-96 rounded-full blur-[180px] md:blur-[280px] bg-primary"></div>
        <h2 className="billo md:hidden text-center text-5xl text-light w-full">
          CONVO
        </h2>
        <h2 className="hidden md:block text-3xl text-center font-semibold text-light w-full">
          Login
        </h2>
        <div className="w-full md:w-[70%]">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            className="w-full"
          >
            {({ isSubmitting, status }) => (
              <Form className="my-auto mx-auto">
                <div
                  className={`flex items-center justify-center rounded-lg text-red-500 h-16 text-sm text-center mb-6 px-4 ${
                    status ? ' bg-black/25 ' : ' '
                  }`}
                >
                  {status}
                </div>
                <InputFormik
                  lable="Email"
                  name="email"
                  icon={faAt}
                  type="email"
                  placeholder="Enter your Email"
                />
                <InputFormik
                  lable="Password"
                  name="password"
                  icon={faLock}
                  type="password"
                  placeholder="************"
                />
                <button
                  type="submit"
                  className="w-full text-white font-bold py-2 rounded transition duration-300 bg-primary hover:bg-primary-dimmer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loggin in...' : 'Login'}
                </button>
                <div className="text-center flex justify-center gap-2 text-sm text-white p-6 mt-3">
                  <p>You don't have an account?</p>
                  <Link
                    to="/signup"
                    className="cursor-pointer duration-300 text-secondary hover:text-secondary-dimmer"
                  >
                    Sign up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <AuthCover />
    </div>
  )
}
