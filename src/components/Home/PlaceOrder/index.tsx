import React, { Fragment, useState } from 'react';
import { ethers } from 'ethers';
import { Tab } from '@headlessui/react';
import { useAccount, useConnect } from 'wagmi';

import Block from '@/components/common/Block';
import Button from '@/components/common/Button';
import Heading from '@/components/common/Heading';
import Input from '@/components/common/Input';
import TxModal from '@/components/common/Modal/TxSubmitModal';

import { CHAIN_ID, contractABI, contractAddress } from '@/utils/constants';
import {
  notify,
  notifyError,
  notifyInformation,
  notifySuccess,
} from '@/utils/toasts';

const makerTakerList = ['Maker', 'Taker'];

const PlaceOrderBlock = () => {
  const [type, setType] = useState(makerTakerList[0]);
  const [volume, setVolume] = useState<number | string>('');
  const [markup, setMarkup] = useState<number | string>('');
  const [hash, setHash] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [variant, setVariant] = useState<'submit' | 'success'>('submit');
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useAccount();

  const { connect, connectors } = useConnect({
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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (
        volume === undefined ||
        markup === undefined ||
        type === undefined ||
        volume === '' ||
        markup === ''
      ) {
        notifyError('Invalid Input');
        setIsLoading(false);
        return;
      }
      if (Math.floor(+volume) !== +volume || Math.floor(+markup) !== +markup) {
        notifyError('Invalid Input, only integer values allowed');
        setIsLoading(false);
        return;
      }
      if (volume === 0) {
        notifyError('Volume must be greater than 0');
        setIsLoading(false);
        return;
      }
      if (window.ethereum === undefined) {
        notifyError('Metamask not installed');
        setIsLoading(false);
        return;
      }

      const bool = type === 'Maker' ? 1 : 0;
      const _markup = bool ? +markup : -markup;
      const _volume = +volume;
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.orderplace(_volume, bool, _markup);
      const hash = tx?.hash;
      setHash(hash);
      setVariant('submit');
      setOpen(true);
      notifyInformation('Transaction Submitted');

      await tx?.wait();
      setVariant('success');
      notifySuccess('Transaction Successfull');
    } catch (error) {
      console.log(error);
      notifyError('Something went wrong');
    } finally {
      setIsLoading(false);
      setVolume('');
      setMarkup('');
    }
  };

  return (
    <>
      <Block css="flex-1">
        <div className="py-[18px] bg-brand-primary text-center">
          <Heading label="Place Order" variant="large" />
        </div>
        <form className="p-4 space-y-4 ">
          <Input
            value={volume}
            onChange={({ target }) => setVolume(target.value)}
            placeholder="Enter Volume"
            type={'number'}
            required={true}
          />
          <Tab.Group
            onChange={(index) => {
              setType(makerTakerList[index]);
            }}
            defaultIndex={0}
          >
            <Tab.List
              className={
                'flex gap-0 justify-between bg-grey-800 rounded overflow-hidden'
              }
            >
              {makerTakerList.map((item, index) => {
                return (
                  <Tab key={index} as={Fragment}>
                    {({ selected }) => {
                      return (
                        <div
                          className={`cursor-pointer flex-1 rounded text-center text-base py-3 outline-none border-none ${
                            selected ? 'bg-brand-primary' : ''
                          }`}
                        >
                          {item}
                        </div>
                      );
                    }}
                  </Tab>
                );
              })}
            </Tab.List>
          </Tab.Group>
          <Input
            placeholder={
              type === makerTakerList[0] ? 'Markup %' : 'Max Slippage %'
            }
            type="number"
            required
            value={markup}
            onChange={({ target }) => setMarkup(target.value)}
            max={100}
            min={0}
          />
          {isConnected ? (
            <Button
              isLoading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              css="w-full"
            >
              Submit
            </Button>
          ) : (
            <Button
              isLoading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                connect({ connector: connectors[0] });
              }}
              css="w-full"
            >
              Connect Wallet
            </Button>
          )}
        </form>
      </Block>

      <TxModal
        hash={hash}
        closeModal={() => setOpen(false)}
        isOpen={open}
        variant={variant}
      />
    </>
  );
};

export default PlaceOrderBlock;
