import { Formik, Form } from "formik";
import * as yup from "yup";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../API/authentication.js";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [isDeveloper, setIsDeveloper] = useState(true);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    role: "Developer",
    type: "Individual",
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
    role: yup.string().required("Please select a role"),
    type: yup.string().required("Please select a type"),
  });

  const onSubmit = (values) => {
    console.log(values);
    login({ ...values, role: isDeveloper ? "Developer" : "Employer" })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("there is error in login");
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-lg rounded p-10  w-full md:w-2xl mt-10">
        {/* <div className="flex gap-4 bg-gray-400 p-1 rounded text-white my-6">
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
        </div> */}
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
                {/* Role Selector */}
                <div className="flex gap-1 bg-gray-200 p-1 rounded text-white my-6">
                  <button
                    type="button"
                    className={`flex-1 p-1 ${
                      formikProps.values.role === "Developer"
                        ? "bg-gray-600"
                        : "bg-gray-400"
                    } rounded cursor-pointer`}
                    onClick={() => {
                      formikProps.setFieldValue("role", "Developer");
                      formikProps.setFieldValue("type", "Individual");
                    }}
                  >
                    Developer
                  </button>
                  <button
                    type="button"
                    className={`flex-1 p-1 ${
                      formikProps.values.role === "Employer"
                        ? "bg-gray-600"
                        : "bg-gray-400"
                    } rounded cursor-pointer`}
                    onClick={() =>
                      formikProps.setFieldValue("role", "Employer")
                    }
                  >
                    Employer
                  </button>
                </div>
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
                {/* Employer-specific Fields */}
                {formikProps.values.role === "Employer" && (
                  <>
                    <InputField
                      label="Account Type"
                      type="radio"
                      name="type"
                      options={["Individual", "Organization"]}
                      required
                    />
                  </>
                )}

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
          <span>
            New user?{" "}
            <Link to="/signin" className="underline text-blue-700">
              SignIn
            </Link>
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}