export const isDev = process.env.NEXT_PUBLIC_IS_DEV;
export const CHAIN_ID = isDev ? 80001 : 137;
export const maticPriceAPI = process.env.NEXT_PUBLIC_ETH_PRICE_API;
export const maticCurrentPriceKey = 'matic_usdt_c_price';
export const maticChangeKey = 'matic_usdt_change';
export const contractAddress = isDev
  ? '0x51E3ED0d93AfE3de891D73551BFc279BC315C9E8'
  : '';
export const contractABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'when',
        type: 'uint256',
      },
    ],
    name: 'AuctionBookChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'when',
        type: 'uint256',
      },
    ],
    name: 'OrderBookChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerSet',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_auctionID', type: 'uint256' }],
    name: 'auctioncancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'auctions',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'int256', name: 'volume', type: 'int256' },
      { internalType: 'bool', name: 'TakerMaker', type: 'bool' },
      { internalType: 'int256', name: 'markup', type: 'int256' },
      { internalType: 'int256', name: 'price', type: 'int256' },
      { internalType: 'uint256', name: 'lockout', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_auctionID', type: 'uint256' }],
    name: 'claim',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_sender', type: 'address' }],
    name: 'displayAuctions',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'auctionid', type: 'uint256' },
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'int256', name: 'volume', type: 'int256' },
          { internalType: 'int256', name: 'markup', type: 'int256' },
          { internalType: 'int256', name: 'price', type: 'int256' },
        ],
        internalType: 'struct liquorice.auctionView[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_sender', type: 'address' }],
    name: 'displayOrders',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'int256', name: 'volume', type: 'int256' },
          { internalType: 'int256', name: 'markup', type: 'int256' },
        ],
        internalType: 'struct liquorice.ordersView[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestPrice',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'maticBalances',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int256', name: '_key', type: 'int256' },
      { internalType: 'uint256', name: '_id', type: 'uint256' },
    ],
    name: 'ordercancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int256', name: '_volume', type: 'int256' },
      { internalType: 'bool', name: '_TakerMaker', type: 'bool' },
      { internalType: 'int256', name: '_markup', type: 'int256' },
    ],
    name: 'orderplace',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int256', name: '', type: 'int256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'orders',
    outputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'int256', name: 'volume', type: 'int256' },
      { internalType: 'bool', name: 'TakerMaker', type: 'bool' },
      { internalType: 'int256', name: 'markup', type: 'int256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int256', name: '_maxMarkup', type: 'int256' },
      { internalType: 'int256', name: '_volume', type: 'int256' },
    ],
    name: 'precheck',
    outputs: [
      { internalType: 'int256', name: 'checksum', type: 'int256' },
      { internalType: 'uint256', name: 'makerID', type: 'uint256' },
      { internalType: 'int256', name: '_makerMarkup', type: 'int256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'priceLadder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'markup', type: 'int256' },
          { internalType: 'int256', name: 'volume', type: 'int256' },
        ],
        internalType: 'struct liquorice.orderbookView[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'usdcBalances',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_key', type: 'uint256' }],
    name: 'viewAuction',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'int256', name: 'volume', type: 'int256' },
          { internalType: 'bool', name: 'TakerMaker', type: 'bool' },
          { internalType: 'int256', name: 'markup', type: 'int256' },
          { internalType: 'int256', name: 'price', type: 'int256' },
          { internalType: 'uint256', name: 'lockout', type: 'uint256' },
        ],
        internalType: 'struct liquorice.auction[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int256', name: '_key', type: 'int256' },
      { internalType: 'uint256', name: '_id', type: 'uint256' },
    ],
    name: 'viewOrder',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'int256', name: 'volume', type: 'int256' },
          { internalType: 'bool', name: 'TakerMaker', type: 'bool' },
          { internalType: 'int256', name: 'markup', type: 'int256' },
        ],
        internalType: 'struct liquorice.order',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int256', name: '_key', type: 'int256' }],
    name: 'volumeSum',
    outputs: [{ internalType: 'int256', name: 'levelSum', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
