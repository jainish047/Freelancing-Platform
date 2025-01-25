import { Formik, Form, Field, ErrorMessage } from "formik";

export default function InputField(props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name}>
        {props.label}
        {props.required ? <span className="text-red-600">*</span> : null}
      </label>
      <Field
        type={props.type || ""}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        className="border border-blue-500 rounded p-1"
      />
      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red-600 text-sm"
      />
    </div>
  );
}
