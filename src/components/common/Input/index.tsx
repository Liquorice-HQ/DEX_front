import React from 'react';

type InputProps = {
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  css?: string;
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const Input = ({ css, placeholder, type, ...props }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`bg-grey-800 block border border-grey-700 rounded w-full p-3 text-base ${css}`}
      {...props}
    />
  );
};

export default Input;
