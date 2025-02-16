import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { signin } from "../API/authentication";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    role: "Developer",
    type: "Individual",
    companyName: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup.string().required("Please select a role"),
    type: yup.string().when("role", (role, schema) => {
      return role === "Employer"
        ? schema.required("Please select a type")
        : schema.notRequired();
    }),    
    companyName: yup.string().when(["role", "type"], ([role, type], schema) => {
      return role === "Employer" && type === "Organization"
        ? schema.required("Company name is required")
        : schema.notRequired();
    }),
  });

  const onSubmit = (values) => {
    signin({
      email: values.email,
      password: values.password,
      role: values.role,
      type: values.role === "Employer" ? values.type : undefined,
      companyName:
        values.role === "Employer" && values.type === "Organization"
          ? values.companyName
          : undefined,
    })
      .then(() => {
        navigate("/WaitEmailVerify", {
          state: { email: values.email, role: values.role, type: values.type },
        });
      })
      .catch((error) => {
        console.log(error)
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-lg rounded p-10 w-full md:w-2xl mt-7">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <Form className="flex flex-col py-5 gap-6">
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
                  onClick={() => formikProps.setFieldValue("role", "Employer")}
                >
                  Employer
                </button>
              </div>

              {/* Email & Password Fields */}
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
                placeholder="••••••••"
                required
              />
              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
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
                  {formikProps.values.type === "Organization" && (
                    <InputField
                      label="Company Name"
                      type="text"
                      name="companyName"
                      placeholder="Enter company name"
                      required
                    />
                  )}
                </>
              )}

              <Button type="submit" value="Sign Up" />
              <p className="text-center underline">
                <Link to="/login">Already have an account? Log In</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}