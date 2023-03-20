import Table from '@/components/common/Table';

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

const Auction = () => {
  return (
    <div>
      <Table
        label="Auction"
        tableBody={auctionMockData}
        tableHeader={['Address', 'Price', 'Volume']}
      />
    </div>
  );
};

export default Auction;
