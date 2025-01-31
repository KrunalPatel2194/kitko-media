// src/components/articles/ArticlePreview.tsx
'use client'
import { ArticleService } from '@/app/services/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const ArticlePreview = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [isEnglish, setIsEnglish] = useState(true);

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => ArticleService.getById(id as string),
    enabled: !!id
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Article Preview</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEnglish(true)}
            className={`px-4 py-2 rounded ${isEnglish ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            English
          </button>
          <button
            onClick={() => setIsEnglish(false)}
            className={`px-4 py-2 rounded ${!isEnglish ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            French
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEnglish ? article?.title : article?.titleFr}
        </h2>
        <p className="text-gray-600 whitespace-pre-wrap">
          {isEnglish ? article?.content : article?.contentFr}
        </p>
        
        {article?.tags && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};