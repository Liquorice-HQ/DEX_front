import Auction from '@/components/Home/AuctionTable';
import PendingTxs from '@/components/Home/PendingTxs';
import PlaceOrderBlock from '@/components/Home/PlaceOrder';
import VolMarkupTable from '@/components/Home/VolMarkupTable';

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
