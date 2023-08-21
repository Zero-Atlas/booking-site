import { useState } from "react";

export default function Input(props) {
  const [value, setValue] = useState(props.init || "");

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };
  return (
    <input
      type={props.type}
      name={props.name}
      required={props.required}
      placeholder={props.placeholder}
      value={value}
      onChange={valueChangeHandler}
      step={props.step}
    />
  );
}
