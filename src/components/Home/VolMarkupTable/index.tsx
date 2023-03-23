import Block from '@/components/common/Block';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/Subheading';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { contractAddress, contractABI } from '../../../utils/constants';
import { notifyError } from '../../../utils/toasts';

import MaticUSDTPriceBlock from './MaticUSDTPriceBlock';

type TPriceLadder = {
  volume: string | number;
  markup: string | number;
};

const VolMarkupTable = () => {
  const { isConnected } = useAccount();
  const [priceLadderPositive, setPriceLadderPositive] = useState<
    TPriceLadder[]
  >([]);
  const [priceLadderNegative, setPriceLadderNegative] = useState<
    TPriceLadder[]
  >([]);

  const fetchPriceLadder = useCallback(async () => {
    try {
      if (!isConnected) {
        setPriceLadderNegative([]);
        setPriceLadderPositive([]);
        return;
      }
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const data = await contract.priceLadder();

      if (data === undefined || data.length === 0) {
        throw new Error("Couldn't fetch auctions");
      }
      const priceLadderData = data.map((item: any[]) => {
        const markup = +ethers.utils.formatEther(item[0]) * 1e18 ?? '-';
        const volume = +ethers.utils.formatEther(item[1]) * 1e18 ?? '-';

        return { volume: volume.toString(), markup: markup.toString() };
      });

      setPriceLadderPositive(
        priceLadderData.filter((item: TPriceLadder) => +item.markup > 0)
      );
      setPriceLadderNegative(
        priceLadderData.filter((item: TPriceLadder) => +item.markup < 0)
      );
    } catch (error) {
      console.log(error);
      notifyError(error);
    }
  }, [isConnected]);

  useEffect(() => {
    fetchPriceLadder();

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    contract.on('AuctionBookChanged', () => {
      fetchPriceLadder();
    });

    return () => {
      contract.removeAllListeners('AuctionBookChanged');
    };
  }, [fetchPriceLadder]);

  return (
    <Block css="flex-1">
      <div>
        <MaticUSDTPriceBlock />
      </div>
      <div className="flex justify-between h-full">
        <div className="flex-1 border-r border-brand-primary px-6 py-4">
          <div className="flex justify-between">
            <Heading label="Volume" variant="medium" />
            <Heading label="Markup (in b.p)" variant="medium" />
          </div>
          <div className="space-y-2 mt-4 max-h-full overflow-y-scroll">
            {priceLadderPositive.map((item, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <SubHeading label={item.volume} variant="medium" />
                  <SubHeading label={item.markup} variant="medium" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1 px-6 py-4">
          <div className="flex justify-between">
            <Heading label="Volume" variant="medium" />
            <Heading label="Markup (in b.p)" variant="medium" />
          </div>
          <div className="space-y-2 mt-4 max-h-full overflow-y-scroll">
            {priceLadderNegative.map((item, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <SubHeading label={item.volume} variant="medium" />
                  <SubHeading label={item.markup} variant="medium" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Block>
  );
};

export default VolMarkupTable;
