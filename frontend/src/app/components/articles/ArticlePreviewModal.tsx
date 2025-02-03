import { X, Globe, FileText, Tags, Users, Calendar, Flag } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 p-2 sm:p-4 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] my-4 sm:my-8 overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-4 flex-shrink-0">
            <div className="flex-1 w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{displayTitle}</h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                  article.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {article.status}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                  <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
                  {article.category}
                </span>
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
                    className="text-xs sm:text-sm border-none focus:ring-0 py-1 pl-1 pr-6"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1 self-end sm:self-start"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 grid md:grid-cols-3 gap-4 sm:gap-6 overflow-y-auto py-4">
            <div className="md:col-span-2 space-y-4">
              {/* Market Data */}
              {article.marketData && (
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Market Data</h3>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-500">Price</span>
                      <p className="text-xs sm:text-sm font-medium">${article.marketData.price?.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-500">Market Cap</span>
                      <p className="text-xs sm:text-sm font-medium">${article.marketData.marketCap?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-500">24h Change</span>
                      <p className={`text-xs sm:text-sm font-medium ${
                        (article.marketData.change24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {article.marketData.change24h?.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-sm sm:prose-base max-w-none">
                {displayContent}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tags className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded-md text-[10px] sm:text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Author Details */}
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" /> Author Details
                </h3>
                <p className="text-[10px] sm:text-sm">{article.author}</p>
              </div>

              {/* Publication Details */}
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" /> Publication Details
                </h3>
                <p className="text-[10px] sm:text-sm">
                  Created: {new Date(article.createdAt).toLocaleDateString()}
                </p>
                <p className="text-[10px] sm:text-sm">
                  Publish Date: {new Date(article.publishDate).toLocaleDateString()}
                </p>
              </div>

              {/* Related Companies */}
              {article.relatedCompanies && article.relatedCompanies.length > 0 && (
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4" /> Related Companies
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {article.relatedCompanies.map((company, index) => (
                      <span key={index} className="px-1 sm:px-2 py-0.5 sm:py-1 bg-white rounded-md text-[10px] sm:text-sm border">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreviewModal;