import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import Footer from './Footer';

const Header = dynamic(() => import('./Header'), { ssr: false });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="max-w-screen-xl m-auto mt-12 mb-24">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
