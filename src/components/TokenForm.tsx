import React, { useState } from 'react';
import { Coins, Upload } from 'lucide-react';
import { createMemeToken } from '../utils/solana';
import { ImageUpload } from './ImageUpload';
import { TokenInfo } from './TokenInfo';
import { SocialShare } from './SocialShare';
import { PublishToken } from './PublishToken';
import toast from 'react-hot-toast';

export function TokenForm() {
  const [tokenName, setTokenName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [supply, setSupply] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createMemeToken({
        name: tokenName,
        imageUrl,
        supply: parseFloat(supply),
        description,
      });
      setTokenData(result);
      toast.success('Token created successfully!');
    } catch (error) {
      toast.error('Failed to create token');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Token Symbol Image
          </label>
          <ImageUpload imageUrl={imageUrl} onImageChange={setImageUrl} />
          <p className="mt-1 text-sm text-gray-500">
            Upload an image that will represent your token's symbol
          </p>
        </div>

        <div>
          <label htmlFor="tokenName" className="block text-sm font-medium text-gray-700">
            Token Name
          </label>
          <input
            type="text"
            id="tokenName"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., Doge Coin"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Token Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Describe your token and its purpose..."
            required
          />
        </div>

        <div>
          <label htmlFor="supply" className="block text-sm font-medium text-gray-700">
            Initial Supply
          </label>
          <input
            type="number"
            id="supply"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="1000000"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? (
            <Upload className="animate-spin h-5 w-5" />
          ) : (
            <>
              <Coins className="h-5 w-5 mr-2" />
              Create Token
            </>
          )}
        </button>
      </form>

      {tokenData && (
        <div className="space-y-6">
          <TokenInfo 
            tokenData={tokenData}
            name={tokenName}
            description={description}
            supply={supply}
          />
          <PublishToken tokenData={tokenData} />
          <SocialShare 
            tokenData={tokenData}
            name={tokenName}
            description={description}
          />
        </div>
      )}
    </div>
  );
}