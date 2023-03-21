import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai, mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

import RootLayout from '@/components/RootLayout';

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai, mainnet, goerli],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
    webSocketProvider,
  });

  return (
    <>
      <WagmiConfig client={client}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </WagmiConfig>
      <ToastContainer draggable position="bottom-right" />
    </>
  );
}
