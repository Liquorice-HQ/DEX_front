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
      <div className="flex max-h-[352px] items-stretch justify-between gap-4 overflow-y-scroll">
        <VolMarkupTable />
        <PlaceOrderBlock />
      </div>
      <Auction />
      <PendingTxs />
    </div>
  );
}
