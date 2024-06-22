import { useState, ReactElement } from "react";

interface FormInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  icon: ReactElement;
  name: string;
  placeholder: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  value,
  handleChange,
  icon,
  name,
  placeholder,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div
      className={`w-full border px-4 p-2 rounded-3xl self-center flex ${
        focused ? "border-black" : "border-gray-300"
      }`}
    >
      {icon}
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          handleChange(e);
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        className="outline-transparent w-full"
        placeholder={placeholder}
      />
    </div>
  );
};
