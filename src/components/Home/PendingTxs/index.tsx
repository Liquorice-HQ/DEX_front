import Table from '@/components/common/Table';

import { auctionMockData } from '../AuctionTable';

const PendingTxs = () => {
  return (
    <div>
      <Table
        label="Pending Transactions"
        tableBody={auctionMockData}
        tableHeader={['Address', 'Price', 'Volume']}
      />
    </div>
  );
};

export default PendingTxs;
