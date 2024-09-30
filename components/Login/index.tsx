'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useContext, useEffect, useState } from 'react';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { gql, useMutation } from 'urql';
import { createSale } from '@/utils/escrowClient';
import Cookies from 'js-cookie';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { AppContext } from '@/utils/context';
import Loading from '../Elements/Loading';

export const GENERATE_NONCE = gql`
  mutation GenerateNonce($publicKey: String!) {
    generateNonce(publicKey: $publicKey) {
      nonce
      error
    }
  }
`;

export const LOGIN = gql`
  mutation Login(
    $publicKey: String!
    $nonce: String!
    $signedMessage: String!
  ) {
    login(publicKey: $publicKey, nonce: $nonce, signedMessage: $signedMessage) {
      token
      user {
        email
        id
      }
      error
    }
  }
`;

const Login = () => {
  const { publicKey, connect, disconnect, connected, signMessage, select } =
    useWallet();
  const [{ fetching, data }, login] = useMutation(LOGIN);
  const [{ fetching: generatingNonce }, generateNonce] =
    useMutation(GENERATE_NONCE);
  const {
    context: { user },
  } = useContext(AppContext);

  const handleLogin = async () => {
    await select(PhantomWalletName);
    connect();

    if (!publicKey) return;

    const nonceResponse = await generateNonce({
      publicKey: publicKey.toString(),
    });
    const nonce = nonceResponse.data?.generateNonce?.nonce;

    const encodedMessage = new TextEncoder().encode(nonce);
    const signedMessage = await signMessage?.(encodedMessage);

    const response = await login({
      publicKey: publicKey.toString(),
      signedMessage: JSON.stringify(signedMessage),
      nonce,
    });
    if (response.data?.login?.token) {
      Cookies.set('token', response.data?.login?.token as string);
      toast.success('Login Successful');
      window.location.reload();
    } else {
      toast.error('Invalid signature');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout')) {
      Cookies.remove('token');
      disconnect();
      window.location.reload();
    }
  };

  return (
    <div className="">
      {connected && user ? (
        <>
          <button
            className="bg-[#F3AA05] space-x-2  text-black sm:p-4 p-2 rounded-[10px] flex items-center "
            onClick={handleLogout}
          >
            <Image
              src="/assets/common/Wallet.svg"
              alt="Wallet Icon"
              width={24}
              height={24}
            />
            <span className="hidden md:block">
              {publicKey?.toString().substring(0, 5) +
                '...' +
                publicKey
                  ?.toString()
                  .substring(publicKey?.toString().length - 3)}
            </span>
          </button>
        </>
      ) : (
        <button
          className="bg-[#F3AA05] space-x-2  text-black sm:p-4 p-2 rounded-[10px] flex items-center"
          onClick={handleLogin}
        >
          {fetching ? (
            <Loading width="6" height="6" />
          ) : (
            <Image
              src="/assets/common/Wallet.svg"
              alt="Wallet Icon"
              width={24}
              height={24}
            />
          )}
          <span className="hidden md:block">Connect Wallet</span>
        </button>
      )}
    </div>
  );
};

export default Login;
