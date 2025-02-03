import Link from "next/link";
import { Article } from "../../types/article";
import { Button } from "../common/Button";
import { StatusBadge } from "../common/StatusBadge";
import { Edit2, Eye, Trash2 } from "lucide-react";

interface ArticleListDesktopProps {
    articles: Article[];
    onPreview: (article: Article) => void;
    onDelete: (article: Article) => void;
  }
  
  export const ArticleListDesktop: React.FC<ArticleListDesktopProps> = ({
    articles,
    onPreview,
    onDelete
  }) => (
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
            {articles.map((article) => (
              <tr key={article.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{article.title}</td>
                <td className="p-4">
                  <StatusBadge status={article.status} />
                </td>
                <td className="p-4">{new Date(article.createdAt).toLocaleDateString()}</td>
                <td className="p-4">{article.author}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );