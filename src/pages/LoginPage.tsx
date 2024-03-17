import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const LoginPage = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  // Initial form values
  const initialValues: FormValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  // Form submission handler
  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    // submission logic
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <div
      style={{ backgroundColor: "#222222" }}
      className="flex flex-col md:flex-row justify-center items-center h-screen"
    >
      <div className="md:w-1/2 sm:w-screen">
        <h2 className="block sm: md:p-8 pt-8 absolute top-2 modak font-bold text-3xl text-white sm:text-center">
          CONVO
        </h2>
        <div className="sm:w-full sm:h-full md:w-2/3 m-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="my-auto mx-auto md:mt-20">
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2 text-white"
                  >
                    <FontAwesomeIcon icon={faAt} className="px-1" />
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    style={{ backgroundColor: "#2B2B2B" }}
                    className="w-full px-4 py-2 border-b-4 border-b-gray-400 focus:outline-none focus:border-indigo-500"
                  />
                  <p className="h-6">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm pt-1"
                    />
                  </p>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className=" text-sm font-semibold mb-2 text-white flex justify-between"
                  >
                    <div>
                      <FontAwesomeIcon icon={faLock} className="px-1" />
                      Password
                    </div>
                    <Link
                      to=""
                      className=" cursor-pointer duration-300 text-gray-400 hover:text-indigo-400 px-1 "
                    >
                      Forget Password?
                    </Link>
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="************"
                    style={{ backgroundColor: "#2B2B2B" }}
                    className="w-full px-4 py-2 border-b-4 border-b-gray-400 focus:outline-none focus:border-indigo-500"
                  />
                  <p className="h-6">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm pt-1"
                    />
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full text-white font-bold py-2 rounded-md transition duration-300 mt-6 bg-indigo-500 hover:bg-indigo-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Login"}
                </button>
                <p className="text-center text-sm text-white p-6 mt-3">
                  You don't have an account?
                  <Link
                    to="/signup"
                    className=" cursor-pointer duration-300 text-yellow-200 hover:text-indigo-400 px-1 "
                  >
                    Register Now
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="w-full md:w-1/2 sm:flex-none">
        <img
          src="/images/Group.svg"
          alt="Signup"
          className="object-cover w-screen h-screen"
        />
      </div>
    </div>
  );
};

export default LoginPage;
