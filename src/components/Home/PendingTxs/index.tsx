import Table from '@/components/common/Table';
import { ethers } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { contractAddress, contractABI } from '@/utils/constants';
import { notifyError } from '@/utils/toasts';

import { TAuction } from '../AuctionTable';

const PendingTxs = () => {
  const { address, isConnected } = useAccount();
  const [orders, setOrders] = useState<TAuction[]>([]);

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

      const data = await contract.displayOrders(address);

      if (data === undefined || data.length === 0) {
        throw new Error("Couldn't fetch auctions");
      }
      const ordersData = data.map((item: any[]) => {
        const _address = item[1] ?? '-';
        const id =
          (+ethers.utils.formatEther(item[0]) * 1e18).toString() ?? '-';
        const volume =
          (+ethers.utils.formatEther(item[2]) * 1e18).toString() ?? '-';
        const markup =
          (+ethers.utils.formatEther(item[3]) * 1e18).toString() ?? '-';

        return { address: _address, id, volume, markup };
      });

      setOrders(ordersData);
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
        label="Pending Transactions"
        tableBody={orders}
        tableHeader={['Address', 'Volume', 'Markup']}
      />
    </div>
  );
};

export default PendingTxs;
