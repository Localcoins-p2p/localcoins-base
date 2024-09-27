import idl from '@/idl/idl.json';
import * as anchor from '@project-serum/anchor';

import { Connection, PublicKey } from '@solana/web3.js';

export const connectAnchorProvider = async () => {
  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  );
  if (!window.solana) {
    return { error: 'Solana not present' };
  }
  const sprovider = window.solana;
  if (!sprovider) {
    throw new Error('Phantom wallet not found');
  }
  const wallet = await sprovider.connect();
  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );

  return { wallet, connection, provider };
};

// Program ID from the ID

// Function to create a sale
export async function createSale({ amount }: { amount: number }) {
  try {
    const { provider, wallet } = await connectAnchorProvider();
    const authority = wallet.publicKey;

    // Generate PDA for sale
    const programId = new PublicKey(
      process.env.NEXT_PUBLIC_PROGRAM_ID as string
    );

    // Create program instance
    const program = new anchor.Program(idl as any, programId, provider);
    const [salePda] = await PublicKey.findProgramAddress(
      [Buffer.from('sale'), authority.toBuffer()],
      programId
    );

    const [masterPda] = await PublicKey.findProgramAddress(
      [Buffer.from('master')],
      programId
    );

    console.log('MAster', masterPda.toBase58());
    // Call the createSale function
    const tx = await program.methods
      .createSale(new anchor.BN(1000000)) // Amount should be passed as a BN
      .accounts({
        sale: salePda,
        master: masterPda,
        authority: authority,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc(); // Send the transaction

    console.log('Transaction successful with signature:', tx);
  } catch (error) {
    console.error('Error creating sale:', error);
  }
}
