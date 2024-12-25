import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { supabase } from './supabase';

interface CreateTokenParams {
  name: string;
  imageUrl: string;
  supply: number;
  description: string;
  wallet: PublicKey;
}

export async function createMemeToken({ name, imageUrl, supply, description, wallet }: CreateTokenParams) {
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const payer = Keypair.generate();

  try {
    // Create new token mint
    const mint = await createMint(
      connection,
      payer,
      wallet,
      wallet,
      9
    );

    // Get the token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      wallet
    );

    // Mint tokens
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer,
      supply * Math.pow(10, 9)
    );

    // Store token info in Supabase
    const { error } = await supabase.from('tokens').insert({
      name,
      description,
      mint_address: mint.toBase58(),
      image_url: imageUrl,
      supply,
      user_id: (await supabase.auth.getUser()).data.user?.id
    });

    if (error) throw error;

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