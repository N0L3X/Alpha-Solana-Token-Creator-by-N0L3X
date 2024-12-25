import React from 'react';
import { Info, Copy } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface TokenInfoProps {
  tokenData: {
    mint: string;
    tokenAccount: string;
  };
  name: string;
  description: string;
  supply: string;
}

export function TokenInfo({ tokenData, name, description, supply }: TokenInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <Info className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Token Information</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Token Name</label>
          <p className="mt-1">{name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Description</label>
          <p className="mt-1">{description}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Total Supply</label>
          <p className="mt-1">{supply}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Token Address</label>
          <div className="mt-1 flex items-center">
            <code className="text-sm bg-gray-50 p-2 rounded flex-1 overflow-x-auto">
              {tokenData.mint}
            </code>
            <button
              onClick={() => copyToClipboard(tokenData.mint)}
              className="ml-2 p-2 text-gray-400 hover:text-gray-600"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}