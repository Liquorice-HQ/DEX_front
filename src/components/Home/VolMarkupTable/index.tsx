import Block from '@/components/common/Block';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/Subheading';

import EthUSDCPriceBlock from './EthUSDCPriceBlock';

const mockData = [
  { vol: '24.05', price: '1.256' },
  { vol: '24.05', price: '1.256' },
  { vol: '24.05', price: '1.256' },
  { vol: '24.05', price: '1.256' },
];

const VolMarkupTable = () => {
  return (
    <Block css="flex-1">
      <div>
        <EthUSDCPriceBlock />
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
