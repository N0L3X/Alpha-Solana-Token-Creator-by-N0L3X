import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';
import '@solana/wallet-adapter-react-ui/styles.css';

export function WalletButton() {
  const { connected } = useWallet();

  return (
    <div className="relative inline-block">
      <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 rounded-md">
        <Wallet className="h-5 w-5 mr-2 inline-block" />
        {connected ? 'Connected' : 'Connect Wallet'}
      </WalletMultiButton>
    </div>
  );
}