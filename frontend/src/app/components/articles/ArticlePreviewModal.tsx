import { X, Globe } from 'lucide-react';
import React, { useState } from 'react';
import { Article } from '@/app/types/article';

interface ArticlePreviewModalProps {
  article: Article;
  onClose: () => void;
}

const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({ article, onClose }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  
  const displayTitle = language === 'en' ? article.title : article.titleFr || article.title;
  const displayContent = language === 'en' ? article.content : article.contentFr || article.content;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-4 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-4 sm:p-6 flex flex-col h-full">
          <div className="flex justify-between items-start border-b pb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{displayTitle}</h2>
              <div className="flex items-center gap-4 mt-2">
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
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
                    className="text-sm border-none focus:ring-0 py-1 pl-1 pr-6"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                  </select>
                </div>
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
            {article.marketData && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Market Data</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-gray-500">Price</span>
                    <p className="font-medium">${article.marketData.price?.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Market Cap</span>
                    <p className="font-medium">${article.marketData.marketCap?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">24h Change</span>
                    <p className={`font-medium ${
                      (article.marketData.change24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {article.marketData.change24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="prose max-w-none">
              {displayContent}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
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