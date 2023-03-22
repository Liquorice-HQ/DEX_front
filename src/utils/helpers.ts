import { isDev } from './constants';

export const getShorterAddress = (address?: string) => {
  if (address === undefined) return undefined;
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export const hashURL = (hash: string) => {
  return isDev
    ? `https://mumbai.polygonscan.com/tx/${hash}`
    : `https://polygonscan.com/tx/${hash}`;
};
