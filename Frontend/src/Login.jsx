import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import InputField from "./components/InputField";
import Button from "./components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isDeveloper, setIsDeveloper] = useState(true);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .min(3, "email too short")
      .required("please enter user name"),
    password: yup
      .string()
      .min(6, "password too short")
      .required("enter password"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-lg rounded p-10  w-full md:w-2xl mt-10">
        <div className="flex gap-4 bg-gray-400 p-1 rounded text-white my-6">
          <button
            className={`flex-1 p-1 ${
              isDeveloper ? "bg-gray-500" : ""
            } rounded cursor-pointer`}
            onClick={() => {
              setIsDeveloper(true);
            }}
          >
            Developer
          </button>
          <button
            className={`flex-1 p-1 ${
              !isDeveloper ? "bg-gray-500" : ""
            } rounded  cursor-pointer`}
            onClick={() => {
              setIsDeveloper(false);
            }}
          >
            Employer
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            return (
              <Form
                className="flex flex-col py-5 gap-6"
                onSubmit={formikProps.handleSubmit}
              >
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="abc123@email.com"
                  required
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="12345678"
                  required
                />

                <Button type="submit" value="Login" />

                <div className="flex items-center my-1 text-gray-400">
                  <hr className="flex-grow" />
                  <span className="mx-1 text-gray-600">or</span>
                  <hr className="flex-grow" />
                </div>
              </Form>
            );
          }}
        </Formik>
        <button className="flex justify-center border border-blue-700 p-1 rounded-full hover:bg-blue-600 hover:text-white cursor-pointer w-full">
          Continue with{" "}
          <img src="./assets/GoogleLogo2.svg" alt="Google" className="mx-1" />
        </button>
        <hr className="text-gray-400 my-4" />
        <p className="text-center">
          <span>New user?{" "}
          <Link to="/signin" className="underline text-blue-700">SignIn</Link></span>
        </p>
      </div>
    </div>
  );
}
