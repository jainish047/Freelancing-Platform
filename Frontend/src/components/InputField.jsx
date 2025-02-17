import { Form, Formik, Field, ErrorMessage } from "formik";

export default function InputField(props) {
  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      <label htmlFor={props.name} className="font-medium text-gray-700">
        {props.label}
        {props.required ? <span className="text-red-600">*</span> : null}
      </label>

      {/* Check for Checkbox or Radio Button */}
      {props.type === "checkbox" && props.options ? (
        <div>
          {props.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <Field
                type="checkbox"
                id={`${props.name}-${index}`}
                name={props.name}
                value={option}
                className="mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : props.type === "radio" && props.options ? (
        <div className="flex gap-4">
          {props.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <Field
                type="radio"
                id={`${props.name}-${index}`}
                name={props.name}
                value={option}
                className="mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : (
        // Default input (text, password, etc.)
        <Field
          type={props.type || "text"}
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 shadow-sm"
          rows={props.rows || ""}
          cols={props.cols || ""}
          as={props.as || "input"}
        />
      )}

      {/* Error Message */}
      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red-600 text-sm"
      />
    </div>
  );
}
