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
      className="flex flex-col md:flex-row md:justify-center items-center h-screen relative"
    >
      {/* This Div show in small Screen Only */}
      <div className="block md:hidden h-64 w-full relative ">
        <div
          style={{
            backgroundColor: "#7A5AF9",
            borderRadius: "50%",
            filter: "blur(280px)",
          }}
          className="h-[60%]"
        ></div>
        <div className="flex flex-col  items-center">
          <p className="text-center text-white text-2xl my-10 ">Login</p>
        </div>
      </div>
      {/* Form */}
      <div className="md:w-1/2 sm:w-screen ">
        <h2 className="block sm: md:p-8 pt-8 absolute top-2 modak font-bold text-3xl text-white sm:text-center">
          CONVO
        </h2>
        <div className="sm:w-full sm:h-full md:w-[70%] m-auto ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="my-auto mx-auto md:mt-20 ">
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

      <div className="w-full md:w-1/2 sm:flex-none hidden md:block">
        <div
          style={{
            position: "relative",
            textAlign: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "#111111",
          }}
        >
          {/* Background with blur */}
          <div
            style={{
              width: "30%",
              height: "30%",
              backgroundColor: "#7A5AF9",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(100px)",
              opacity: "0.7",
            }}
          ></div>

          {/* Text */}
          <div className="sm:hidden  absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-aliceblue md:flex flex-col items-center justify-center w-60 h-60 rounded-full text-white ">
            <h1 className="text-6xl font-bold py-2">ENJOY</h1>
            <h1 className="text-6xl font-bold py-2">MEANINGFUL</h1>
            <h1 className="text-6xl font-bold py-2">CONVERSATION</h1>
            <div className="w-72 text-5xl flex justify-between  py-4 gap-[30px] ">
              <span className="bg-opacity-20 bg-slate-300 p-4 rounded-full">
                &#9996;
              </span>
              <span className="bg-opacity-20 bg-slate-300 p-4 rounded-full">
                &#129392;
              </span>
              <span className="bg-opacity-20 bg-slate-300 p-4 rounded-full">
                &#129395;
              </span>
            </div>
          </div>
          <div className="h-screen flex flex-col justify-end">
            <h3 className="text-center text-3xl font-bold py-5 text-white">
              CONVO
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
