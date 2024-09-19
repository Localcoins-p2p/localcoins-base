'use client';

import client from '@/client';
import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'urql';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header/Header';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint =
    'https://capable-rough-road.solana-devnet.discover.quiknode.pro/ef4d29ab3f286ac54013bd9e161445c749a2dd5e/';
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      fetch('/api/token').then((data) => {
        data.json().then((d) => {
          Cookies.set('token', d.token);
          window.location.reload();
        });
      });
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Toaster />
              <SessionProvider>
                {<Provider value={client}>{children}</Provider>}
              </SessionProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
