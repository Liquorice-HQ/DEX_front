import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  css?: string;
}

const Button = ({ children, css, onClick, disabled, ...rest }: ButtonProps) => {
  if (children === undefined) {
    <button
      onClick={onClick}
      className={`rounded-lg bg-brand-primary px-10 py-3 outline-none opacity-90 hover:opacity-100 hover:shadow-sm hover:shadow-brand-primary transition-all ease-in-out duration-200 text-grey-100 text-base ${css}`}
      {...rest}
    >
      <span className="animate-pulse h-4 w-8"></span>
    </button>;
  }
  if (disabled) {
    return (
      <button
        onClick={onClick}
        className={`rounded-lg bg-grey-800 px-10 py-3 outline-none text-grey-100 text-base ${css}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`rounded-lg bg-brand-primary px-10 py-3 outline-none opacity-90 hover:opacity-100 hover:shadow-sm hover:shadow-brand-primary transition-all ease-in-out duration-200 text-grey-100 text-base ${css}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
