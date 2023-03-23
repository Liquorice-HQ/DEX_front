import Table from '@/components/common/Table';
import { ethers } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { contractAddress, contractABI } from '@/utils/constants';
import { notifyError, notifyInformation, notifySuccess } from '@/utils/toasts';

import { TAuction } from '../AuctionTable';
import TxModal from '../../common/Modal/TxSubmitModal';

const PendingTxs = () => {
  const { address, isConnected } = useAccount();
  const [orders, setOrders] = useState<TAuction[]>([]);
  const [hash, setHash] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [variant, setVariant] = useState<'submit' | 'success'>('submit');

  const fetchAuctions = useCallback(async () => {
    try {
      if (!isConnected) {
        setOrders([]);
        return;
      }
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
      console.log('called');

      fetchAuctions();
    });

    return () => {
      contract.removeAllListeners('AuctionBookChanged');
    };
  }, [fetchAuctions]);

  const cancelOrder = async (id: string, markup: string) => {
    try {
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await contract.ordercancel(markup, id);
      const hash = tx?.hash;

      setHash(hash);
      setOpen(true);
      setVariant('submit');
      notifyInformation('Transaction Submitted');

      await tx?.wait();
      setVariant('success');
      notifySuccess('Transaction Successfull');
    } catch (error) {
      console.log(error);
      notifyError('Something went wrong');
    }
  };
  return (
    <>
      <div>
        <Table
          label="Pending Transactions"
          tableBody={orders}
          tableHeader={['Address', 'Volume', 'Markup']}
          claim={undefined}
          cancel={cancelOrder}
        />
      </div>
      <TxModal
        variant={variant}
        isOpen={open}
        closeModal={() => setOpen(false)}
        hash={hash}
      />
    </>
  );
};

export default PendingTxs;
