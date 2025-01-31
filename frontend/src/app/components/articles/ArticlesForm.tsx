// src/components/articles/ArticleForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Article } from '../../types/article';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  publishDate: z.string().min(1, 'Publish date is required'),
  category: z.enum(['mining', 'crypto']),
  status: z.enum(['draft', 'published'])
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  initialData?: Partial<Article>;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  isLoading?: boolean;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
  isLoading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      ...initialData,
      publishDate: initialData?.publishDate 
        ? new Date(initialData.publishDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          {...register('content')}
          rows={5}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          {...register('author')}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Publish Date</label>
        <input
          type="date"
          {...register('publishDate')}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
        />
        {errors.publishDate && (
          <p className="mt-1 text-sm text-red-600">{errors.publishDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category')}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
        >
          <option value="mining">Mining</option>
          <option value="crypto">Crypto</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register('status')}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Article'}
      </button>
    </form>
  );
};