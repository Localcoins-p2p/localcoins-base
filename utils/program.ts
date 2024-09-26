import { AnchorProvider, BN, Program, web3 } from '@project-serum/anchor';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import IDL from '@/idl/idl.json';

export const MASTER_SEED = 'master';
export const SALE_SEED = 'sale';

export const getProgram = (connection: any, wallet: any) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: 'confirmed',
  });
  const program = new Program(
    IDL as any,
    process.env.NEXT_PUBLIC_PROGRAM_ID as string,
    provider
  );
  return program;
};

export const getMasterAddress = async () => {
  const programId = new web3.PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID as string
  );
  return (
    await PublicKey.findProgramAddress([Buffer.from(MASTER_SEED)], programId)
  )[0];
};
