import React from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

export function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange('');
  };

  return (
    <div className="mt-1 flex items-center">
      {imageUrl ? (
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt="Token symbol"
            className="h-16 w-16 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-indigo-500">
          <Upload className="h-6 w-6 text-gray-400" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
}