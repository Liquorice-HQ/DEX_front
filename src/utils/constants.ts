export const isDev = process.env.NEXT_PUBLIC_IS_DEV;
export const CHAIN_ID = isDev ? 80001 : 137;
export const ethPriceAPI = process.env.NEXT_PUBLIC_ETH_PRICE_API;
export const ethCurrentPriceKey = 'eth_usdc_c_price';
export const ethChangeKey = 'eth_usdc_change';
