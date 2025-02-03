'use client'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PressReleaseService } from '@/app/services/pressRelease.service';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const PressReleaseForm = () => {
  const [pressRelease, setPressRelease] = useState('');
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { pressRelease: string }) => {
      return PressReleaseService.generateFullArticle(data.pressRelease);
    },
    onSuccess: (data) => {
      router.push(`/articles/preview?id=${data.id}`);
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Generate Article from Press Release</h1>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          mutate({ pressRelease });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Press Release Content
              </label>
              <textarea 
                value={pressRelease}
                onChange={(e) => setPressRelease(e.target.value)}
                rows={10}
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
                placeholder="Paste your press release here..."
                required
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
              <h3 className="font-medium mb-2">This will:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Generate a full article from your press release</li>
                <li>Create SEO-optimized titles in English and French</li>
                <li>Extract relevant tags and company mentions</li>
                <li>Include market data for mentioned companies</li>
                <li>Provide translations in both languages</li>
              </ul>
            </div>

            <button 
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-[#AE8766] text-white rounded-lg hover:bg-[#8e6d52] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending && <LoadingSpinner />}
              {isPending ? 'Generating Full Article...' : 'Generate Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};