'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useContext, useEffect, useMemo, useState } from 'react';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { gql, useMutation } from 'urql';
import { createSale } from '@/utils/escrowClient';
import Cookies from 'js-cookie';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { AppContext } from '@/utils/context';
import Loading from '../Elements/Loading';
import { getConnection } from '@/utils/base-calls';
import { decodeJwt } from '@/utils/decode-jwt';

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
    $wallet: String
  ) {
    login(
      publicKey: $publicKey
      nonce: $nonce
      signedMessage: $signedMessage
      wallet: $wallet
    ) {
      token
      user {
        email
        id
        paymentMethods {
          accountName
          id
          name
          accountNumber
        }
      }
      error
    }
  }
`;

const Login = () => {
  const { publicKey, connect, disconnect, connected, signMessage, select } =
    useWallet();
  const [metaKey, setMetakey] = useState('');
  const [{ fetching, data }, login] = useMutation(LOGIN);
  const [showOptions, setShowOptions] = useState(false);
  const [{ fetching: generatingNonce }, generateNonce] =
    useMutation(GENERATE_NONCE);
  const {
    context: { user },
  } = useContext(AppContext);

  const handleMetakey = async () => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      const { provider } = await getConnection();
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      const publicKey = accounts[0];
      setMetakey(publicKey);
    }
  };

  const wallet = useMemo(() => {
    const data = decodeJwt(Cookies.get('token') || '');
    return data.w;
  }, []);

  useEffect(() => {
    if (wallet === 'metamask') {
      handleMetakey();
    }
  }, [user, wallet]);

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
      wallet: 'phantom',
    });
    if (response.data?.login?.token) {
      Cookies.set('token', response.data?.login?.token as string);
      toast.success('Login Successful');
      window.location.reload();
    } else {
      toast.error('Invalid signature');
    }
  };

  const handleLoginMetamask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      const { provider } = await getConnection();
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      const publicKey = accounts[0];
      const nonceResponse = await generateNonce({ publicKey });
      const nonce = nonceResponse.data?.generateNonce?.nonce;

      const signedMessage = await signer.signMessage(nonce);
      console.log('Signed', signedMessage);

      const response = await login({
        publicKey,
        signedMessage: signedMessage,
        nonce,
        wallet: 'metamask',
      });
      if (response.data?.login?.token) {
        Cookies.set('token', response.data?.login?.token as string);
        toast.success('Login Successful');
        window.location.reload();
      } else {
        toast.error('Invalid signature');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to login with Metamask');
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
    <>
      <div className="">
        {(connected && user) || (metaKey && user) ? (
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
                {(publicKey || metaKey)?.toString().substring(0, 5) +
                  '...' +
                  (publicKey || metaKey)
                    ?.toString()
                    .substring((publicKey || metaKey)?.toString().length - 3)}
              </span>
            </button>
          </>
        ) : (
          <button
            className="bg-[#F3AA05] space-x-2  text-black sm:p-4 p-2 rounded-[10px] flex items-center"
            onClick={() => setShowOptions(true)}
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
      {showOptions && (
        <div
          className="fixed top-0 left-0 h-screen w-screen bg-[#000000dd] z-[999] flex justify-center items-center flex-col gap-4"
          onClick={() => setShowOptions(false)}
        >
          <h1 className="text-2xl text-white font-semibold">Choose a Wallet</h1>
          <div
            className="border border-white rounded-lg text-white text-3xl p-4 w-[320px] mt-8 text-center cursor-pointer"
            onClick={handleLoginMetamask}
          >
            Metamask
          </div>
          <div
            className="border border-white rounded-lg text-white text-3xl p-4 w-[320px] text-center cursor-pointer"
            onClick={handleLogin}
          >
            Phantom
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
