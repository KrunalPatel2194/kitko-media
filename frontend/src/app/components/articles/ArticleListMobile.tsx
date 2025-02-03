import Link from "next/link";
import { Article } from "../../types/article";
import { Button } from "../common/Button";
import { StatusBadge } from "../common/StatusBadge";
import { Edit2, Eye, Trash2 } from "lucide-react";

interface ArticleListMobileProps {
    articles: Article[];
    language?: 'en' | 'fr';
    onPreview: (article: Article) => void;
    onDelete: (article: Article) => void;
}
  
export const ArticleListMobile: React.FC<ArticleListMobileProps> = ({
    articles,
    language = 'en',
    onPreview,
    onDelete
}) => (
    <div className="block sm:hidden">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow mb-4 p-4">
          <div className="mb-2">
            <h3 className="font-medium">
              {language === 'en' ? article.title : article.titleFr || article.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <StatusBadge status={article.status} />
              <span>•</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
            <Button 
              variant="primary"
              onClick={() => onPreview(article)}
              icon={<Eye className="h-5 w-5" />}
            />
            <Link href={`/articles/edit?id=${article.id}`}>
              <Button 
                variant="primary"
                icon={<Edit2 className="h-5 w-5" />}
              />
            </Link>
            <Button 
              variant="danger"
              onClick={() => onDelete(article)}
              icon={<Trash2 className="h-5 w-5" />}
            />
          </div>
        </div>
      ))}
    </div>
);