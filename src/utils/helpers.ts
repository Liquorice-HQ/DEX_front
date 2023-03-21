export const getShorterAddress = (address?: string) => {
  if (address === undefined) return undefined;
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};
