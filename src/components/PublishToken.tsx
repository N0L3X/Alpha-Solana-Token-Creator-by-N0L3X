import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { publishToExchanges } from '../utils/exchanges';
import toast from 'react-hot-toast';

interface PublishTokenProps {
  tokenData: {
    mint: string;
  };
}

export function PublishToken({ tokenData }: PublishTokenProps) {
  const [publishing, setPublishing] = useState(false);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await publishToExchanges(tokenData.mint);
      toast.success('Token published to exchanges successfully!');
    } catch (error) {
      toast.error('Failed to publish token');
      console.error(error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <Rocket className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Publish Token</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        Publish your token to make it available on popular exchanges and listing sites.
      </p>
      
      <button
        onClick={handlePublish}
        disabled={publishing}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {publishing ? 'Publishing...' : 'Publish Token'}
      </button>
    </div>
  );
}