import React from 'react';
import { Share2, Twitter, MessageCircle, FileCode2 } from 'lucide-react';

interface SocialShareProps {
  tokenData: {
    mint: string;
  };
  name: string;
  description: string;
}

export function SocialShare({ tokenData, name, description }: SocialShareProps) {
  const shareText = `Check out ${name} - ${description}`;
  const shareUrl = `https://explorer.solana.com/address/${tokenData.mint}`;

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Reddit',
      icon: FileCode2,
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <Share2 className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Share Token</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        Share your token on social media to attract investors and build community.
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        {socialLinks.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <platform.icon className="h-5 w-5 mr-2" />
            {platform.name}
          </a>
        ))}
      </div>
    </div>
  );
}