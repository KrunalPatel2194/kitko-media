// src/components/articles/PressReleaseForm.tsx
'use client'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ArticleService } from '@/app/services/api';

export const PressReleaseForm = () => {
  const [pressRelease, setPressRelease] = useState('');
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { pressRelease: string; language: 'en' | 'fr' }) => 
      ArticleService.generateFromPressEnhanced(data),
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
          mutate({ pressRelease, language });
        }}>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Language
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-md ${
                    language === 'en' 
                      ? 'bg-[#AE8766] text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-4 py-2 rounded-md ${
                    language === 'fr' 
                      ? 'bg-[#AE8766] text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  French
                </button>
              </div>
            </div>

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

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#AE8766] text-white rounded-lg hover:bg-[#8e6d52] disabled:opacity-50"
            >
              {isLoading ? 'Generating Article...' : 'Generate Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};