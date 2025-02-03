import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TagInput } from './../common/TagInput';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  titleFr: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  contentFr: z.string().optional(),
  author: z.string().min(1, 'Author is required'),
  publishDate: z.string().min(1, 'Publish date is required'),
  category: z.enum(['mining', 'crypto']),
  status: z.enum(['draft', 'published']),
  tags: z.array(z.string()).optional(),
  relatedCompanies: z.array(z.string()).optional()
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => void;
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
    formState: { errors },
    setValue,
    watch
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      ...initialData,
      publishDate: initialData?.publishDate 
        ? new Date(initialData.publishDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      tags: initialData?.tags || [],
      relatedCompanies: initialData?.relatedCompanies || []
    }
  });

  const tags = watch('tags') || [];
  const companies = watch('relatedCompanies') || [];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold text-gray-900">
          {initialData ? 'Edit Article' : 'Create New Article'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Content */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Title (English)</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* French Content */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Title (French)</label>
            <input
              type="text"
              {...register('titleFr')}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Content (English)</label>
            <textarea
              {...register('content')}
              rows={8}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Content (French)</label>
            <textarea
              {...register('contentFr')}
              rows={8}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            />
          </div>

          {/* Tags and Companies */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <TagInput
              tags={tags}
              onTagsChange={(newTags) => setValue('tags', newTags)}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Related Companies</label>
            <TagInput
              tags={companies}
              onTagsChange={(newCompanies) => setValue('relatedCompanies', newCompanies)}
            />
          </div>

          {/* Existing Fields */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              {...register('author')}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Publish Date</label>
            <input
              type="date"
              {...register('publishDate')}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            />
            {errors.publishDate && (
              <p className="mt-1 text-sm text-red-600">{errors.publishDate.message}</p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category')}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            >
              <option value="mining">Mining</option>
              <option value="crypto">Crypto</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('status')}
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-[#AE8766] focus:border-[#AE8766]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 bg-[#AE8766] text-white rounded-md hover:bg-[#8e6d52] disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </form>
    </div>
  );
};