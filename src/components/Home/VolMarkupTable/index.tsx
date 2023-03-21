import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import Block from '@/components/common/Block';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/Subheading';

import { useGetETHPrice } from '@/hooks/useGetETHPrice';

const mockData = [
  { vol: '24.05', price: '1.256' },
  { vol: '24.05', price: '1.256' },
  { vol: '24.05', price: '1.256' },
  { vol: '24.05', price: '1.256' },
];

const VolMarkupTable = () => {
  const { change, currentPrice } = useGetETHPrice();
  return (
    <Block css="flex-1">
      <div>
        <div className="pt-2 px-6 pb-2 border-b border-brand-primary">
          <SubHeading
            label={<span className="text-brand-primary">ETH/USDT</span>}
            variant="medium"
          />
          {currentPrice !== undefined && change !== undefined ? (
            <div className="flex flex-nowrap gap-2 items-baseline">
              <Heading
                css={`
                  ${change > 0 ? 'text-success' : ' text-red-700'}
                `}
                label={currentPrice}
                variant="large"
              />
              <SubHeading
                css={`
                  ${change > 0 ? 'text-success' : ' text-red-700'}
                `}
                label={
                  <span className="flex flex-nowrap gap-1">
                    {change > 0 ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                    <span>{change?.toFixed(2)}</span>
                  </span>
                }
                variant="small"
              />
            </div>
          ) : (
            <Heading label={undefined} css={'w-6 h-2'} variant="medium" />
          )}
        </div>
      </div>
      <div className="flex justify-between h-full">
        <div className="flex-1 border-r border-brand-primary px-6 py-4">
          <div className="flex justify-between">
            <Heading label="Volume" variant="medium" />
            <Heading label="Markup" variant="medium" />
          </div>
          <div className="space-y-2 mt-4">
            {mockData.map((item, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <SubHeading label={item.vol} variant="medium" />
                  <SubHeading label={item.price} variant="medium" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1 px-6 py-4">
          <div className="flex justify-between">
            <Heading label="Volume" variant="medium" />
            <Heading label="Markup" variant="medium" />
          </div>
        </div>
      </div>
    </Block>
  );
};

export default VolMarkupTable;
