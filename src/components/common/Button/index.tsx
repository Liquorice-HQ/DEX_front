import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  label: ReactNode;
  css?: string;
};
const Button = ({ label, css, ...rest }: ButtonProps) => {
  return (
    <button
      className={`rounded-lg bg-brand-primary px-10 py-3 outline-none opacity-90 hover:opacity-100 hover:shadow-sm hover:shadow-brand-primary transition-all ease-in-out duration-200 text-grey-100 text-base ${css}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
