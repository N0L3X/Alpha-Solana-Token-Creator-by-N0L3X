import React from 'react';
import { Toaster } from 'react-hot-toast';
import { TokenForm } from './components/TokenForm';
import { Coins } from 'lucide-react';
import { WalletButton } from './components/WalletButton';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <WalletButton />
        </div>

        <div className="text-center">
          <Coins className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Solana Meme Token Creator
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Create your own meme token on Solana in seconds
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
          <TokenForm />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Currently connected to Solana Devnet</p>
          <p className="mt-2">
            Note: You'll need SOL in your wallet to create tokens.{' '}
            <a
              href="https://solfaucet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Get test SOL from the faucet
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;