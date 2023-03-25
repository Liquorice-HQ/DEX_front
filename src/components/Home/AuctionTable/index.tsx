import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import Table from '@/components/common/Table';
import TxModal from '@/components/common/Modal/TxSubmitModal';

import { contractABI, contractAddress } from '@/utils/constants';
import { notifyError, notifyInformation, notifySuccess } from '@/utils/toasts';

export type TAuction = {
  id: number | string;
  address: string;
  volume: number | string;
  markup: number | string;
};
const Auction = () => {
  const { address, isConnected } = useAccount();
  const [auctions, setAuctions] = useState<TAuction[]>([]);
  const [hash, setHash] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [variant, setVariant] = useState<'submit' | 'success'>('submit');

  const fetchAuctions = useCallback(async () => {
    try {
      if (!isConnected) {
        setAuctions([]);
        return;
      }
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
        const id =
          (+ethers.utils.formatEther(item[0]) * 1e18).toString() ?? '-';
        const _address = item[1] ?? '-';
        const volume =
          (+ethers.utils.formatEther(item[2]) * 1e18).toString() ?? '-';
        const markup =
          (+ethers.utils.formatEther(item[4]) * 1e18).toString() ?? '-';

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

    contract.on('OrderBookChanged', () => {
      fetchAuctions();
    });

    return () => {
      contract.removeAllListeners('AuctionBookChanged');
      contract.removeAllListeners('OrderBookChanged');
    };
  }, [fetchAuctions]);

  const claimAuction = async (id: string) => {
    try {
      const _id = ethers.utils.parseEther(id).toString();
      console.log({ id, _id });

      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await contract.claim(_id);
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

  const cancelAuction = async (id: string, _: string) => {
    try {
      const _id = ethers.utils.parseEther(id);
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await contract.auctioncancel(_id);
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
          label="Auction"
          tableBody={auctions}
          tableHeader={['Address', 'Volume', 'Markup']}
          cancel={cancelAuction}
          claim={claimAuction}
        />
      </div>

      <TxModal
        hash={hash}
        closeModal={() => setOpen(false)}
        isOpen={open}
        variant={variant}
      />
    </>
  );
};

export default Auction;
