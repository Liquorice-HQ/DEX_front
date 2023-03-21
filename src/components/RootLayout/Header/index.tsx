import Image from 'next/image';
import { Fragment } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Menu } from '@headlessui/react';

import Logo from '@/assets/svg/logo.svg';

import SubHeading from '@/components/common/Subheading';
import Heading from '@/components/common/Heading';
import Button from '@/components/common/Button';

import { CHAIN_ID } from '@/utils/constants';
import {
  notify,
  notifyError,
  notifyInformation,
  notifySuccess,
} from '@/utils/toasts';
import { getShorterAddress } from '@/utils/helpers';

import HeaderTitle from './HeaderTitle';

const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading } = useConnect({
    chainId: CHAIN_ID,
    onError(e: any) {
      if (e.code === -32002) {
        notify(
          'Your wallet already has a pending request waiting for your signature'
        );
      } else if (e.name === 'ConnectorNotFoundError') {
        window.open('https://metamask.io/download/', '_blank');
        notifyError('Could not find injected web3 wallet in your browser');
      } else if (e.code === 4001) {
        notifyError(e.message);
      } else {
        notifyError(e.message);
      }
    },
    onSuccess() {
      notifySuccess('Wallet Connected');
    },
  });
  const { disconnect } = useDisconnect();

  const disconnectWallet = () => {
    disconnect();
    notifyInformation('Wallet Disconnected');
  };

  return (
    <>
      <header className="max-w-screen-xl m-auto">
        <div className="flex justify-between items-center pt-4 pb-2">
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
          {isConnected ? (
            <div className="relative">
              <Menu>
                <Menu.Button
                  className={
                    'rounded-lg bg-brand-primary px-10 py-3 outline-none opacity-90 hover:opacity-100 hover:shadow-sm hover:shadow-brand-primary transition-all ease-in-out duration-200 text-grey-100 text-base'
                  }
                  disabled={isLoading}
                >
                  {getShorterAddress(address)}
                </Menu.Button>
                <Menu.Items
                  className={
                    'absolute border border-grey-500 w-[125%] rounded right-0 z-50 backdrop-blur-md top-[125%]'
                  }
                >
                  <Menu.Item key={'copy'} as={Fragment}>
                    <div className="cursor-pointer border-b border-grey-500 px-4 py-4">
                      Copy Address
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'logout'} as={Fragment}>
                    <div
                      onClick={() => disconnectWallet()}
                      className="cursor-pointer px-4 py-4"
                    >
                      Logout
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          ) : (
            <>
              <Button
                onClick={() =>
                  connect({
                    connector: connectors[0],
                  })
                }
                disabled={isLoading}
              >
                Connect Wallet
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
