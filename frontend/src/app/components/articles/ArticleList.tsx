// src/components/articles/ArticleList.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArticleService } from '../../services/api';
import { SearchBar } from './SearchBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArticlePreviewModal from './ArticlePreviewModal';
import { Edit2, Eye, Menu, Trash2 } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}


interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Delete Article</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{title}"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed sm:top-4 sm:right-4 bottom-4 sm:bottom-auto left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 z-50
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-lg shadow-lg`}>
      {message}
    </div>
  );
};
export const ArticleList = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const searchBarRef = useRef<{ resetSearch: () => void }>(null);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [updatedId, setUpdatedId] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['articles', searchQuery, currentPage],
    queryFn: () => ArticleService.list({ 
      search: searchQuery || undefined,
      page: currentPage,
      limit: 10
    }),
    keepPreviousData: true,
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false // Prevent refetch on window focus
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  useEffect(() => {
    if (data?.pagination?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ['articles', searchQuery, currentPage + 1],
        queryFn: () => ArticleService.list({ 
          search: searchQuery || undefined,
          page: currentPage + 1,
          limit: 10
        })
      });
    }
  }, [data, currentPage, queryClient, searchQuery]);
  // Update the pagination section to handle edge cases
  const handlePageChange = (newPage: number) => {
    console.log(data ,"Data")
    const totalPages = data?.pagination?.totalPages || 1;
    console.log(newPage >= 1 && newPage <= totalPages && newPage !== currentPage ,"LOGI")
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(() => newPage);
      console.log(currentPage ,"PAGE")
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (updatedId) {
      const timer = setTimeout(() => {
        setUpdatedId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [updatedId]);
  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchBarRef.current) {
      searchBarRef.current.resetSearch();
    }
  };

  const deleteMutation = useMutation({
    mutationFn: ArticleService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      showToast('Article deleted successfully');
    },
    onError: () => {
      showToast('Failed to delete article', 'error');
    }
  });

  const handleDelete = async (article: Article) => {
    setArticleToDelete(article);
  };

  const handlePreview = (article) => setSelectedArticle(article);
  const handleClosePreview = () => setSelectedArticle(null);
  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      try {
        await deleteMutation.mutateAsync(articleToDelete.id);
        setUpdatedId(articleToDelete.id)
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setArticleToDelete(null);
      }
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <div className="w-full sm:w-80 flex gap-2">
          <SearchBar 
            ref={searchBarRef}
            value={searchQuery} 
            onSearch={setSearchQuery} 
          />
          {searchQuery && (
            <button 
              onClick={handleClearSearch}
              className="text-[#AE8766] hover:text-[#8e6d52] p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a7 7 0 110 14 7 7 0 010-14zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
          )}
        </div>
      </div>


      {/* Mobile View */}
      <div className="block sm:hidden">
        {data?.data.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow mb-4 p-4">
            <div className="mb-2">
              <h3 className="font-medium">{article.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  article.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {article.status}
                </span>
                <span>•</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
  <button
    onClick={() => handlePreview(article)}
    className="text-[#AE8766] hover:text-[#8e6d52] p-1"
  >
    <Eye className="h-5 w-5" />
  </button>
  <Link 
    href={`/articles/edit?id=${article.id}`}
    className="text-[#AE8766] hover:text-[#8e6d52] p-1"
  >
    <Edit2 className="h-5 w-5" />
  </Link>
  <button
        onClick={() => handleDelete(article)}
        className="text-red-600 hover:text-red-700 p-1"
      >
        <Trash2 className="h-5 w-5" />
      </button>
</div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 w-24">Status</th>
                <th className="p-4 w-32">Created</th>
                <th className="p-4 w-40">Author</th>
                <th className="p-4 w-36 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((article) => (
                <tr key={article.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{article.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">{article.author}</td>
                  <td className="p-4">
  <div className="flex items-center justify-end gap-4">
    <button
      onClick={() => handlePreview(article)}
      className="text-[#AE8766] hover:text-[#8e6d52] p-1"
    >
      <Eye className="h-5 w-5" />
    </button>
    <Link 
      href={`/articles/edit?id=${article.id}`}
      className="text-[#AE8766] hover:text-[#8e6d52] p-1"
    >
      <Edit2 className="h-5 w-5" />
    </Link>
    <button
        onClick={() => handleDelete(article)}
        className="text-red-600 hover:text-red-700 p-1"
      >
        <Trash2 className="h-5 w-5" />
      </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
  isOpen={!!articleToDelete}
  onClose={() => setArticleToDelete(null)}
  onConfirm={handleDeleteConfirm}
  title={articleToDelete?.title || ''}
/>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600 order-2 sm:order-1">
          Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, data?.pagination?.totalItems || 0)} of {data?.pagination?.totalItems} results
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600 order-2 sm:order-1">
          Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, data?.pagination?.totalItems || 0)} of {data?.pagination?.totalItems || 0} results
        </p>
        <div className="flex flex-wrap justify-center gap-1 order-1 sm:order-2">
          {data?.pagination && Array.from({ length: data.pagination.totalPages }).map((_, idx) => {
            const pageNumber = idx + 1;
            const isVisible = window.innerWidth >= 640 || 
                            Math.abs(pageNumber - currentPage) <= 1 || 
                            pageNumber === 1 || 
                            pageNumber === data.pagination.totalPages;

            if (!isVisible) return null;
            
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-8 h-8 rounded-md ${
                  currentPage === pageNumber 
                    ? 'bg-[#AE8766] text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
      </div>
      {selectedArticle && <ArticlePreviewModal article={selectedArticle} onClose={handleClosePreview} />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};