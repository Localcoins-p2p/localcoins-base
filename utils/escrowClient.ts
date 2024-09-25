import * as anchor from '@project-serum/anchor';
import idl from '@/idl/idl.json';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  Keypair,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Buffer } from 'buffer';

export const connectAnchorProvider = async () => {
  if (!window.solana) {
    return { error: 'Solana not present' };
  }
  const provider = window.solana;
  if (!provider) {
    throw new Error('Phantom wallet not found');
  }
  const wallet = await provider.connect();
  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  );

  return { wallet, connection, provider };
};

export const createSale = async ({ amount }: { amount: number }) => {
  const programId = new anchor.web3.PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID as string
  );
  const { wallet, provider, connection } = await connectAnchorProvider();
  const program = new anchor.Program(
    JSON.parse(JSON.stringify(idl)),
    programId,
    provider
  );
  const SALE_SEED = 'sale';
  const MASTER_SEED = 'master';

  const saleAmount = new anchor.BN(amount);
  const authority = wallet.publicKey;

  const [salePda, saleBump] = await PublicKey.findProgramAddress(
    [Buffer.from(SALE_SEED), authority.toBuffer()],
    programId
  );

  const [masterPda] = await PublicKey.findProgramAddress(
    [Buffer.from('master')],
    programId
  );

  // Create the transaction instruction for createSale
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: salePda, isSigner: false, isWritable: true },
      { pubkey: masterPda, isSigner: false, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: true },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    programId: programId,
    data: Buffer.from(
      Uint8Array.of(1, ...new anchor.BN(amount).toArray('le', 8))
    ),
  });

  const transaction = new Transaction().add(instruction);

  transaction.feePayer = authority;
  const { blockhash } = (await connection?.getLatestBlockhash()) || {};
  transaction.recentBlockhash = blockhash;

  const signedTransaction = await provider.signTransaction(transaction);
  const signature =
    (await connection?.sendRawTransaction(signedTransaction.serialize())) || '';

  await connection?.confirmTransaction(signature);
  console.log('Transaction successful with signature:', signature);
};
