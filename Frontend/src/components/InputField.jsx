import { Form,Formik,Field, ErrorMessage } from "formik";

export default function InputField(props) {
  return (
    <div className="flex flex-col mb-4">
      
      <label htmlFor={props.name}>
        {props.label}
        {props.required ? <span className="text-red-600">*</span> : null}
      </label>

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
      ) : (
        <Field
          type={props.type || "text"}
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          className="border border-blue-500 rounded p-1"
          rows={props.rows || ""}
          cols={props.cols || ""}
          as={props.as || "input"}
        />
      )}


      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red-600 text-sm"
      />
    </div>
  );
}
