const isDev = process.env.NEXT_PUBLIC_IS_DEV;
export const CHAIN_ID = isDev ? 80001 : 137;
