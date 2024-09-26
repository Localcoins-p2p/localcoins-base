'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { gql, useMutation } from 'urql';
import { createSale } from '@/utils/escrowClient';

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

    login({
      publicKey: publicKey.toString(),
      signedMessage: JSON.stringify(signedMessage),
      nonce,
    });
  };

  return (
    <div className="text-white">
      <>
        <p>Connected with: {publicKey?.toString()}</p>
        <button onClick={handleLogin}>Login</button>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={() => createSale({ amount: 1000 })}>
          Create Sale
        </button>
      </>
    </div>
  );
};

export default Login;
