import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import {
  ethChangeKey,
  ethCurrentPriceKey,
  ethPriceAPI,
} from '@/utils/constants';

type Price = {
  currentPrice: number | undefined;
  change: number | undefined;
};

const timer = 5000;

export const useGetETHPrice = () => {
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
    if (ethPriceAPI === undefined) {
      setPrice({ change: undefined, currentPrice: undefined });
      return;
    }

    const storedCurrentPrice = getCookie(ethCurrentPriceKey);
    const storedChangeValue = getCookie(ethChangeKey);

    if (storedCurrentPrice !== undefined && storedChangeValue !== undefined) {
      setPrice({
        currentPrice: Number(storedCurrentPrice),
        change: Number(storedChangeValue),
      });
      return;
    }

    const response = await fetch(ethPriceAPI);
    const data = await response.json();

    const openingPrice = data?.data?.o || 0;
    const currentPrice = data?.data?.c || 0;
    const change = ((currentPrice - openingPrice) / openingPrice) * 100;

    setPrice({ currentPrice, change });
    setCookie(ethCurrentPriceKey, currentPrice, { maxAge: 10 });
    setCookie(ethChangeKey, change, { maxAge: 10 });
  };

  return { currentPrice: price.currentPrice, change: price.change };
};
