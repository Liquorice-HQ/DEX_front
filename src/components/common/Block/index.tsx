import { ReactNode } from 'react';

type BlockProps = {
  children: ReactNode;
  css?: string;
};
const Block = ({ children, css }: BlockProps) => {
  return (
    <div
      className={`rounded-xl bg-grey-700 border border-brand-primary overflow-hidden ${css}`}
    >
      {children}
    </div>
  );
};

export default Block;
