import { chdir } from 'process';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <section className="max-w-screen-xl m-auto mt-12 mb-24">
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default RootLayout;
