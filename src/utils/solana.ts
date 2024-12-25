import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token';

interface CreateTokenParams {
  name: string;
  imageUrl: string;
  supply: number;
}

export async function createMemeToken({ name, imageUrl, supply }: CreateTokenParams) {
  // Connect to Solana's devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Generate a new wallet keypair for testing
  const payer = Keypair.generate();

  try {
    // Create new token mint
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey,
      payer.publicKey,
      9 // 9 decimals like SOL
    );

    // Get the token account of the payer address
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    // Mint tokens to the token account
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer,
      supply * Math.pow(10, 9) // Convert to smallest units
    );

    // In a production environment, you would store the imageUrl with the token metadata
    // on a decentralized storage solution like IPFS or Arweave

    return {
      mint: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      imageUrl,
    };
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
}