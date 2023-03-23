import dynamic from 'next/dynamic';

import Auction from '@/components/Home/AuctionTable';
import PendingTxs from '@/components/Home/PendingTxs';
import VolMarkupTable from '@/components/Home/VolMarkupTable';

const PlaceOrderBlock = dynamic(() => import('@/components/Home/PlaceOrder'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="space-y-16">
      <div className="flex justify-between gap-4">
        <VolMarkupTable />
        <PlaceOrderBlock />
      </div>
      <Auction />
      <PendingTxs />
    </div>
  );
}
