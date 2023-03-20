import React, { ReactNode } from 'react';

type HeadingProps = {
  label: ReactNode | undefined;
  variant: 'large' | 'medium' | 'small';
  css?: string;
};

const SubHeading = ({ css = '', label, variant }: HeadingProps) => {
  const styles =
    variant === 'large'
      ? 'text-lg'
      : variant === 'medium'
      ? 'text-sm'
      : 'text-xs text-grey-500';
  if (label === undefined) return <h1 className="h-5 w-10 animate-pulse"></h1>;
  return <h1 className={`${styles} text-grey-500 ${css}`}>{label}</h1>;
};

export default SubHeading;
