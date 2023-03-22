import React from 'react';
import Loader from '@/assets/svg/btn_loader.svg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  css?: string;
  isLoading?: boolean;
}

const Button = ({
  children,
  css,
  onClick,
  disabled,
  isLoading,
  ...rest
}: ButtonProps) => {
  if (isLoading === true) {
    return (
      <button
        className={`rounded-lg bg-brand-primary px-10 py-3 outline-none opacity-40 transition-all ease-in-out duration-200 text-grey-100 text-base ${css}`}
        {...rest}
        disabled={true}
        onClick={() => {}}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="animate-spin ease-linear m-auto"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.45535 3.06607C9.90572 1.44431 12.8449 0.5 16 0.5C19.1551 0.5 22.0943 1.44432 24.5447 3.06607L22.8889 5.56778C20.9144 4.26099 18.5484 3.5 16 3.5C13.4516 3.5 11.0856 4.26099 9.11108 5.56778L7.45535 3.06607ZM0.5 16C0.5 12.8449 1.44432 9.90572 3.06607 7.45535L5.56778 9.11108C4.26099 11.0856 3.5 13.4516 3.5 16C3.5 18.5484 4.26099 20.9144 5.56778 22.8889L3.06607 24.5447C1.44431 22.0943 0.5 19.1551 0.5 16ZM28.9339 7.45535C30.5557 9.90572 31.5 12.8449 31.5 16C31.5 19.1551 30.5557 22.0943 28.9339 24.5447L26.4322 22.8889C27.739 20.9144 28.5 18.5484 28.5 16C28.5 13.4516 27.739 11.0856 26.4322 9.11108L28.9339 7.45535ZM16 31.5C12.8449 31.5 9.90572 30.5557 7.45535 28.9339L9.11108 26.4322C11.0856 27.739 13.4516 28.5 16 28.5C18.5484 28.5 20.9144 27.739 22.8889 26.4322L24.5447 28.9339C22.0943 30.5557 19.1551 31.5 16 31.5Z"
            fill="white"
          />
        </svg>
      </button>
    );
  }
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
