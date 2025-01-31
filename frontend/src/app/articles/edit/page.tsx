'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArticleForm } from '../../components/articles/ArticlesForm'
import { Layout } from '../../components/Layout/Layout'
import { useQuery, useMutation } from '@tanstack/react-query'
import { ArticleService } from '../../services/api'

export default function EditArticle() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  const { data: article } = useQuery({
    queryKey: ['article', id],
    queryFn: () => ArticleService.getById(id as string),
    enabled: !!id
  })

  const { mutate } = useMutation({
    mutationFn: (data) => ArticleService.update(id as string, data),
    onSuccess: () => router.push('/')
  })

  return (
    <Layout>
      {article && <ArticleForm initialData={article} onSubmit={mutate} />}
    </Layout>
  )
}