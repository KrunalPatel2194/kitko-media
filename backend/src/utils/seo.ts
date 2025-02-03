import { IArticle } from "../types/article.types";

// src/utils/seo.ts
export const generateMetadata = (article: IArticle) => ({
    title: article.title,
    description: article.content.substring(0, 160),
    keywords: article.tags?.join(', '),
    alternateUrls: {
      'fr': `/fr/articles/${article.id}`
    },
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.updatedAt,
    }
  });