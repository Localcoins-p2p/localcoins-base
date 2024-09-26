import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { getProgram } from './program';
import { web3 } from '@project-serum/anchor';

export default function useSolana() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const programId = new web3.PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID as string
  );

  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, { publicKey, sendTransaction });
    }
    return null;
  }, [connection, publicKey, sendTransaction]);

  return {
    connection,
    publicKey,
    connected,
    sendTransaction,
    programId,
    program,
  };
}
