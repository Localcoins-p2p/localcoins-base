import React, { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import Loading from './Loading';

const WalletBalance = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>();

  const connection = new Connection('https://api.devnet.solana.com');

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          // Fetch balance in lamports
          const lamports = await connection.getBalance(publicKey);
          // Convert lamports to SOL
          const solBalance = lamports / 1000000000;
          setBalance(solBalance);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [publicKey, connection]);

  return (
    <div>
      {publicKey ? (
        <div>
          {balance !== null ? (
            `${balance} SOL`
          ) : (
            <Loading width="16px" height="16px" />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default WalletBalance;
