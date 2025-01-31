'use client'
import { ArticleList } from './components/articles/ArticleList'
import { Layout } from './components/Layout/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
        <ArticleList />
      </div>
    </Layout>
  )
}