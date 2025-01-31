// src/app/articles/preview/page.tsx
'use client'
import { ArticlePreview } from '../../articles/press/ArticlePreview';
import { Layout } from '../../components/Layout/Layout';

export default function PreviewArticle() {
  return (
    <Layout>
      <ArticlePreview />
    </Layout>
  );
}