import React from "react";

interface TextArea {
  onChange: any;
  value: string;
  name: string;
  id: string;
  placeholder: string;
  rows: any;
}

export default function TextArea({
  onChange,
  value,
  name,
  id,
  placeholder,
  rows,
}: TextArea) {
  return (
    <textarea
      className="rounded-md border-0 my-2 py-1.5 bg-gray-100 dark:bg-slate-700 text-black dark:text-white shadow-sm ring-0 sm:text-sm sm:leading-6 block w-full p-2 resize-none"
      onChange={onChange}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
      rows={rows}
    ></textarea>
  );
}
