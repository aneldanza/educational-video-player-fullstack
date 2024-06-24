import { useState, ReactElement } from "react";
import { FieldMetaProps } from "formik";

interface FormTextareaProps {
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  icon: ReactElement;
  name: string;
  placeholder: string;
  meta?: FieldMetaProps<unknown>;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  value,
  handleChange,
  icon,
  name,
  placeholder,
  meta,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const isError = meta && meta.touched && meta.error;

  return (
    <div className="w-full">
      <div
        className={`w-full border px-4 p-2 rounded-3xl self-center flex ${
          focused ? "border-black" : "border-gray-300"
        } ${isError && "border-red-700"}`}
      >
        {icon}
        <textarea
          id={name}
          name={name}
          defaultValue={value}
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          className={`outline-transparent w-full`}
          placeholder={placeholder}
        />
      </div>
      {meta && meta.touched && meta.error ? (
        <div className="error ml-5">{meta.error}</div>
      ) : null}
    </div>
  );
};
