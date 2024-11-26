import React from "react";

interface Input {
  type: string;
  value: string | number;
  name: string;
  className: string;
  onChange: any;
  placeholder: string;
  label: string;
}

export default function Input({
  type,
  value,
  name,
  className,
  onChange,
  placeholder,
  label,
}: Input) {
  return (
    <div className="form-group">
      {label && <label htmlFor="input-field">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        className={`form-control ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
