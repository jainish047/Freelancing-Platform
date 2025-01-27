import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../API/authentication";
import { ToastContainer, toast } from "react-toastify";


export default function Signin() {
  const [isDeveloper, setIsDeveloper] = useState(true);
  const [isCompany, setIsCompany] = useState(false)
  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: ""
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
    confirmPassword: yup
      .string()
      .min(6, "password too short")
      .required("confirm password")
      .oneOf([yup.ref("password"), null], "passwords must match"),
  });

  const onSubmit = (values) => {
    console.log(values);
    signin({
      email: values.email,
      password: values.password,
      role: isDeveloper ? "Developer" : "Employer",
    })
      .then(() => {
        navigate("/WaitEmailVerify", { state: { email:values.email } });
      })
      .catch((error) => {
        console.log("there is error in signin->", error);
        toast.error(error?.response?.data?.message);
      });
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
        <h1 className="text-2xl font-bold text-center">Signin</h1>
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
                <InputField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="12345678"
                  required
                />

                <Button type="submit" value="Signin" />
                <p className="text-center underline">
                  <Link to="/login">LogIn</Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
