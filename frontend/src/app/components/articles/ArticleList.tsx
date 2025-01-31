'use client';
// src/components/articles/ArticleList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArticleService } from '../../services/api';
import { SearchBar } from './SearchBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const ArticleList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['articles', searchQuery],
    queryFn: () => ArticleService.list({ 
      search: searchQuery || undefined
    })
  });
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  const deleteMutation = useMutation({
    mutationFn: ArticleService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this article?')) {
      try {
        await ArticleService.delete(id);
        queryClient.invalidateQueries({ queryKey: ['articles'] });
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };
  const handleEdit = (id: string) => {
    router.push(`/articles/edit?id=${id}`);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
        {searchQuery && (
          <button onClick={handleClearSearch} className="mt-2 text-sm text-blue-600 hover:text-blue-800">
            Clear Search
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {data?.data.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">By {article.author} • {new Date(article.publishDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                  <Link 
                    href={`/articles/edit?id=${article.id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="mt-4 text-gray-600 line-clamp-3">{article.content}</p>

              <div className="mt-4 flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  article.status === 'published' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {article.status}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data?.pagination && (
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
          <div className="flex flex-1 justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{data.pagination.totalItems}</span> results
              </p>
            </div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {Array.from({ length: data.pagination.totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    data.pagination.currentPage === idx + 1
                      ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};