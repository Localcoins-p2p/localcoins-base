'use client';

import { getMasterAddress, getProgram, SALE_SEED } from '@/utils/program';
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';
import { BN, web3 } from '@project-serum/anchor';
import { PublicKey, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { confirmTx } from '@/utils/helper';
import * as anchor from '@project-serum/anchor';

function Sale() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, { publicKey, sendTransaction });
    }
    return null;
  }, [connection, publicKey, sendTransaction]);

  const handleCreateSale = async () => {
    const programId = new web3.PublicKey(
      process.env.NEXT_PUBLIC_PROGRAM_ID as string
    );
    if (!program) {
      return;
    }
    const masterPda = await getMasterAddress();
    const saleId = new anchor.BN(
      (await program.account.master.fetch(masterPda)).lastId + 1
    );

    const [salePda, saleBump] = await PublicKey.findProgramAddress(
      [Buffer.from(SALE_SEED), saleId.toArrayLike(Buffer, 'le', 4)],
      programId
    );
    const authority = publicKey;

    const transaction = new web3.Transaction().add(
      program.instruction.createSale(new BN(1000000), {
        accounts: {
          sale: salePda,
          master: masterPda,
          authority: authority as PublicKey,
          systemProgram: SystemProgram.programId,
        },
      })
    );
    const txHash = await sendTransaction(transaction, connection);
  };

  return (
    <div className="py-4 px-4 bg-white">
      <button onClick={handleCreateSale}>Hello</button>
      <br />
      <br />
      <WalletMultiButton />
    </div>
  );
}

export default Sale;
