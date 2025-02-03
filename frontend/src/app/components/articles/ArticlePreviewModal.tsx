// src/components/articles/ArticlePreviewModal.tsx
import { X } from 'lucide-react';
import React from 'react';
const ArticlePreviewModal = ({ article, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 p-4 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="p-4 sm:p-6 flex flex-col h-full">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    article.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {article.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.category}
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
  
            <div className="flex-1 overflow-y-auto py-4">
              <div className="prose max-w-none">
                {article.content}
              </div>
            </div>
  
            <div className="border-t pt-4 mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>By {article.author}</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ArticlePreviewModal;
