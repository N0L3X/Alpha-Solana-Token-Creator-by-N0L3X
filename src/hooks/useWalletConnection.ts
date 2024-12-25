import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useWalletConnection() {
  const { connected, publicKey } = useWallet();

  const checkWalletConnection = useCallback(() => {
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet first');
      return false;
    }
    return true;
  }, [connected, publicKey]);

  return {
    connected,
    publicKey,
    checkWalletConnection
  };
}