import React from 'react';
import Image from 'next/image';

import SubHeading from '@/components/common/Subheading';
import Heading from '@/components/common/Heading';
import Button from '@/components/common/Button';

import Logo from '@/assets/svg/logo.svg';

import HeaderTitle from './HeaderTitle';

const Header = () => {
  return (
    <>
      <header className="max-w-screen-xl m-auto">
        <div className="relative flex justify-between items-center pt-4 pb-2">
          <a className="flex gap-2 flex-nowrap items-end" href="./">
            <Image
              className="relative top-[-10px]"
              src={Logo}
              alt="Liquorice"
            />
            <div>
              <Heading label={<HeaderTitle />} variant="large" />
              <SubHeading
                label={'Your secure gateway to CEXs liquidity'}
                variant="small"
              />
            </div>
          </a>
          <Button label={'Wallet'} />
        </div>
      </header>
    </>
  );
};

export default Header;
