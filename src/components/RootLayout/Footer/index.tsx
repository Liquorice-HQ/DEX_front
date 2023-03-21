import Image from 'next/image';

import Button from '@/components/common/Button';
import Heading from '@/components/common/Heading';
import HeaderTitle from '@/components/RootLayout/Header/HeaderTitle';

import Facebook from '@/assets/svg/facebook.svg';
import Twitter from '@/assets/svg/twitter.svg';
import Linkedin from '@/assets/svg/linkedin.svg';
import Logo from '@/assets/svg/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-grey-700 py-4">
      <div className="max-w-screen-xl m-auto">
        <div className="pt-12 flex items-center justify-between pb-6 border-b border-white">
          <a className="flex gap-2 flex-nowrap items-end" href="./">
            <Image className="relative" src={Logo} alt="Liquorice" />
            <div>
              <Heading label={<HeaderTitle />} variant="large" />
            </div>
          </a>
          <Button>Contact Us For More Details</Button>
          <div>
            <Heading label="Social Media Links" variant="medium" />
            <div className="flex justify-between items-center mt-2 px-2">
              <Image src={Facebook} alt="Facebook" />
              <Image src={Twitter} alt="Twitter" />
              <Image src={Linkedin} alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="text-xs text-center w-full mt-6">
          @Liquorice 2022. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
