import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/Subheading';

import { useGetETHPrice } from '@/hooks/useGetETHPrice';

const EthUSDCPriceBlock = () => {
  const { currentPrice, change } = useGetETHPrice();

  return (
    <div className="pt-2 px-6 pb-2 border-b border-brand-primary">
      <SubHeading
        label={<span className="text-brand-primary">ETH/USDT</span>}
        variant="medium"
      />
      {currentPrice !== undefined && change !== undefined ? (
        <div className="flex flex-nowrap gap-2 items-baseline">
          <Heading
            css={`
              ${change > 0 ? 'text-success' : 'text-red-700'}
            `}
            label={`$${currentPrice.toLocaleString('en-US')}`}
            variant="large"
          />
          <SubHeading
            css={`
              ${change > 0 ? 'text-success' : 'text-red-700'}
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
  );
};

export default EthUSDCPriceBlock;
