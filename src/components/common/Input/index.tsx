import React from 'react';
import styles from './styles.module.css';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  css?: string;
}

const Input = ({ css, ...props }: InputProps) => {
  return <input className={`${styles.input} ${css}`} {...props} />;
};

export default Input;
