import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { getProgram } from './program';

export default function useSolana() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, { publicKey, sendTransaction });
    }
    return null;
  }, [connection, publicKey, sendTransaction]);

  return { connection, publicKey, connected, sendTransaction, program };
}
