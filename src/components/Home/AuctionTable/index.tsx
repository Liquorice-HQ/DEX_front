import Table from '@/components/common/Table';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { contractABI, contractAddress } from '../../../utils/constants';
import { notify, notifyError } from '../../../utils/toasts';
import Heading from '../../common/Heading';

export const auctionMockData = [
  {
    address: '0x4ae...ecf',
    price: '20.04',
    vol: '12.34',
    slide: '0.34',
  },
  {
    address: '0x4ae...ecf',
    price: '20.04',
    vol: '12.34',
    slide: '0.34',
  },
  {
    address: '0x4ae...ecf',
    price: '20.04',
    vol: '12.34',
    slide: '0.34',
  },
  {
    address: '0x4ae...ecf',
    price: '20.04',
    vol: '12.34',
    slide: '0.34',
  },
  {
    address: '0x4ae...ecf',
    price: '20.04',
    vol: '12.34',
    slide: '0.34',
  },
  {
    address: '0x4ae...ecf',
    price: '20.04',
    vol: '12.34',
    slide: '0.34',
  },
  {
    address: '0x4ae...ecf',
    price: '20.04',
    vol: '12.34',
    slide: '0.34',
  },
];

export type TAuction = {
  id: number | string;
  address: string;
  volume: number | string;
  markup: number | string;
};
const Auction = () => {
  const { address, isConnected } = useAccount();
  const [auctions, setAuctions] = useState<TAuction[]>([]);

  const fetchAuctions = useCallback(async () => {
    try {
      if (!isConnected) return;
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const data = await contract.displayAuctions(address);

      if (data === undefined || data.length === 0) {
        throw new Error("Couldn't fetch auctions");
      }
      const auctionData = data.map((item: any[]) => {
        const id = ethers.utils.formatEther(item[0]) ?? '-';
        const _address = item[1] ?? '-';
        const volume = ethers.utils.formatEther(item[2]) ?? '-';
        const markup = ethers.utils.formatEther(item[4]) ?? '-';

        return { address: _address, id, volume, markup };
      });

      setAuctions(auctionData);
    } catch (error) {
      console.log(error);
      notifyError(error);
    }
  }, [isConnected, address]);

  useEffect(() => {
    fetchAuctions();

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    contract.on('AuctionBookChanged', () => {
      fetchAuctions();
    });

    return () => {
      contract.removeAllListeners('AuctionBookChanged');
    };
  }, [fetchAuctions]);
  return (
    <div>
      <Table
        label="Auction"
        tableBody={auctions}
        tableHeader={['Address', 'Volume', 'Markup']}
      />
    </div>
  );
};

export default Auction;
