'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { gql, useMutation } from 'urql';

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
  const [nonce, setNonce] = useState<string | null>(null);
  const [{ fetching, data }, login] = useMutation(LOGIN);

  useEffect(() => {
    if (connected && publicKey) {
      setNonce('abc' || Math.random().toString(36).substring(2));
    }
  }, [connected, publicKey]);

  const handleLogin = async () => {
    await select(PhantomWalletName);

    connect();

    if (!publicKey || !nonce) return;

    const encodedMessage = new TextEncoder().encode(nonce);
    const signedMessage = await signMessage?.(encodedMessage);

    login({
      publicKey: publicKey.toString(),
      signedMessage: JSON.stringify(signedMessage),
      nonce,
    });

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     publicKey: publicKey.toString(),
    //     signedMessage,
    //     nonce,
    //   }),
    // });
    // const result = await response.json();
  };

  return (
    <div className="text-white">
      <>
        <p>Connected with: {publicKey?.toString()}</p>
        <button onClick={handleLogin}>Login</button>
        <button onClick={disconnect}>Disconnect</button>
      </>
    </div>
  );
};

export default Login;
