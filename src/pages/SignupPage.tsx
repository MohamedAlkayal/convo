import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import InputFormik from '../components/auth/InputFormik'
import AuthCover from '../components/auth/AuthCover'
import { ax } from '../utilities/axios.config'
import axios, { AxiosError } from 'axios'
import ErrorResponse from '../interfaces/DTOs/ErrorResponseDTO'

interface FormValues {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export default function SignupPage() {
  const navigate = useNavigate()
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Required')
  })

  // Initial form values
  const initialValues: FormValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }

  // Form submission handler
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const data = { ...values, gender: 'male', phonenumber: '01090562346' }
      await ax.post('/auth/signup', data)
      actions.resetForm()
      navigate('/login')
    } catch (err: unknown) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError
        if (axiosError.response) {
          const resErr = axiosError.response.data as ErrorResponse
          if (resErr.message) {
            actions.setStatus(resErr.message)
            return
          }
          actions.setStatus(resErr.errors[0].msg)
          console.log(axiosError.response.status)
        } else {
          actions.setStatus('Network Error')
          console.log(axiosError.message)
        }
      } else {
        actions.setStatus('An error occurred')
        console.error(err)
      }
    }
  }

  return (
    <div className="flex bg-dark h-screen min-h-[800px]">
      <div className="relative flex flex-col justify-center items-center gap-4 p-10 w-full md:w-1/2 h-full">
        <div className="absolute top-0 w-16 h-96 rounded-full blur-[180px] md:blur-[280px] bg-primary"></div>
        <h2 className="billo md:hidden text-center text-5xl text-light w-full">
          CONVO
        </h2>
        <h2 className="hidden md:block text-3xl text-center font-semibold text-light w-full">
          Sign up
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
                  className={`flex items-center rounded-lg text-red-500 h-16 text-sm text-center mb-6 px-4 ${
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
                  lable="Username"
                  name="username"
                  icon={faUser}
                  type="text"
                  placeholder="Enter Username"
                />
                <InputFormik
                  lable="Password"
                  name="password"
                  icon={faLock}
                  type="password"
                  placeholder="************"
                />
                <InputFormik
                  lable="Confirm Password"
                  name="confirmPassword"
                  icon={faLock}
                  type="password"
                  placeholder="************"
                />
                <button
                  type="submit"
                  className="w-full text-white font-bold py-2 rounded transition duration-300 bg-primary hover:bg-primary-dimmer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
                <p className="text-center text-sm text-white p-6 mt-3">
                  You already have an account?
                  <Link
                    to="/login"
                    className=" ml-2 cursor-pointer duration-300 text-secondary hover:text-secondary-dimmer"
                  >
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <AuthCover />
    </div>
  )
}
