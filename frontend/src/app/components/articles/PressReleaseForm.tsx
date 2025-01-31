'use client'
import { ArticleService } from '@/app/services/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const PressReleaseForm = () => {
  const [pressRelease, setPressRelease] = useState('');
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { pressRelease: string }) => ArticleService.generateFromPress(data),
    onSuccess: () => router.push('/')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pressRelease) {
      mutate({ pressRelease });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={pressRelease}
        onChange={(e) => setPressRelease(e.target.value)}
        className="w-full h-64 p-4 border rounded"
        required
      />
      <button 
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isLoading ? 'Generating...' : 'Generate Article'}
      </button>
    </form>
  );
};