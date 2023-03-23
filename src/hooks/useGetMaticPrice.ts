import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import {
  maticCurrentPriceKey,
  maticChangeKey,
  maticPriceAPI,
} from '@/utils/constants';

type Price = {
  currentPrice: number | undefined;
  change: number | undefined;
};

const timer = 5000;

export const useGetMaticPrice = () => {
  const [price, setPrice] = useState<Price>({
    currentPrice: undefined,
    change: undefined,
  });

  useEffect(() => {
    getETHPrice();
    const _interval = setInterval(() => {
      getETHPrice();
    }, timer);

    return () => clearInterval(_interval);
  }, []);

  const getETHPrice = async () => {
    if (maticPriceAPI === undefined) {
      setPrice({ change: undefined, currentPrice: undefined });
      return;
    }

    const storedCurrentPrice = getCookie(maticCurrentPriceKey);
    const storedChangeValue = getCookie(maticChangeKey);

    if (storedCurrentPrice !== undefined && storedChangeValue !== undefined) {
      setPrice({
        currentPrice: Number(storedCurrentPrice),
        change: Number(storedChangeValue),
      });
      return;
    }

    const response = await fetch(maticPriceAPI);
    const data = await response.json();

    const openingPrice = data?.data?.o || 0;
    const currentPrice = data?.data?.c || 0;
    const change = ((currentPrice - openingPrice) / openingPrice) * 100;

    setPrice({ currentPrice, change });
    setCookie(maticCurrentPriceKey, currentPrice, { maxAge: 10 });
    setCookie(maticChangeKey, change, { maxAge: 10 });
  };

  return { currentPrice: price.currentPrice, change: price.change };
};
