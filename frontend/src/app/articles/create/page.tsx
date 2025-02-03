'use client'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ArticleForm } from '../../components/articles/ArticlesForm'
import { Layout } from '../../components/Layout/Layout'
import { ArticleService } from '../../services/api'

export default function CreateArticle() {
  const router = useRouter()
  const { mutate,  isPending } = useMutation({
    mutationFn: ArticleService.create,
    onSuccess: () => router.push('/')
  });

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Article</h1>
        <ArticleForm onSubmit={mutate} isLoading={isPending} />
      </div>
    </Layout>
  )
}