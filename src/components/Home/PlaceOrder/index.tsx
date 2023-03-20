import React, { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';

import Block from '@/components/common/Block';
import Button from '@/components/common/Button';
import Heading from '@/components/common/Heading';
import Input from '@/components/common/Input';

const buySellList = ['Buy', 'Sell'];
const makerTakerList = ['Maker', 'Taker'];

const PlaceOrderBlock = () => {
  const [type, setType] = useState(makerTakerList[0]);

  return (
    <Block css="flex-1">
      <div className="py-[18px] bg-brand-primary text-center">
        <Heading label="Place Order" variant="large" />
      </div>
      <form className="p-4 space-y-4 ">
        <Input
          placeholder="Enter Volume"
          type={'num'}
          props={{ required: true }}
        />

        <Tab.Group defaultIndex={0}>
          <Tab.List
            className={
              'flex gap-0 justify-between bg-grey-800 rounded overflow-hidden'
            }
          >
            {buySellList.map((item, index) => {
              return (
                <Tab key={index} as={Fragment}>
                  {({ selected }) => {
                    return (
                      <div
                        className={`flex-1 rounded text-center text-base py-2 outline-none border-none ${
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
                        className={`flex-1 rounded text-center text-base py-2 outline-none border-none ${
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
          type={'num'}
          props={{ required: true }}
        />
        <Button css="w-full" label="Submit" />
      </form>
    </Block>
  );
};

export default PlaceOrderBlock;
