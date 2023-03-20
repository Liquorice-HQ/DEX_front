import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import RootLayout from '../components/RootLayout';
import Block from '../components/common/Block';
import Heading from '../components/common/Heading';
import SubHeading from '../components/common/Subheading';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import VolMarkupTable from '../components/Home/VolMarkupTable';
import PlaceOrderBlock from '../components/Home/PlaceOrder';
import Auction from '../components/Home/AuctionTable';
import PendingTxs from '../components/Home/PendingTxs';

const inter = Inter({ subsets: ['latin'] });

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
