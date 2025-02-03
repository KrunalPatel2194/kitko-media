// src/components/articles/ArticleList.tsx
'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SearchBar } from './SearchBar';
import ArticlePreviewModal from './ArticlePreviewModal';
import { Article } from '../../types/article';
import { useArticles } from '@/app/hooks/useArticle';
import { useToast } from '@/app/hooks/useToast';
import { ArticleListMobile } from './ArticleListMobile';
import { ArticleListDesktop } from './ArticleListDesktop';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Pagination } from '../common/Pagination';

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
          Are you sure you want to delete `{title}`? This action cannot be undone.
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const searchBarRef = useRef<{ resetSearch: () => void }>(null);
  
  const { data, isLoading, deleteMutation, prefetchNextPage } = useArticles(searchQuery, currentPage);
  const { toast, showToast } = useToast();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    prefetchNextPage();
  }, [prefetchNextPage]);

  const handlePageChange = useCallback((newPage: number) => {
    const totalPages = data?.pagination?.totalPages || 1;
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, data?.pagination?.totalPages]);

  const handleDelete = useCallback(async (article: Article) => {
    setArticleToDelete(article);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (articleToDelete) {
      try {
        await deleteMutation.mutateAsync(articleToDelete.id);
        showToast('Article deleted successfully');
      } catch (error) {
        console.log(error)
        showToast('Failed to delete article', 'error');
      } finally {
        setArticleToDelete(null);
      }
    }
  }, [articleToDelete, deleteMutation, showToast]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <SearchBar 
          ref={searchBarRef}
          value={searchQuery}
          onSearch={setSearchQuery}
          onClear={() => {
            setSearchQuery('');
            searchBarRef.current?.resetSearch();
          }}
        />
      </div>

      <ArticleListMobile
        articles={data?.data || []}
        onPreview={setSelectedArticle}
        onDelete={handleDelete}
      />

      <ArticleListDesktop
        articles={data?.data || []}
        onPreview={setSelectedArticle}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={data?.pagination?.totalPages || 1}
        totalItems={data?.pagination?.totalItems || 0}
        onPageChange={handlePageChange}
      />

      {selectedArticle && (
        <ArticlePreviewModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      <DeleteModal
        isOpen={!!articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title={articleToDelete?.title || ''}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => showToast(toast.message, 'success')}
        />
      )}
    </div>
  );
};