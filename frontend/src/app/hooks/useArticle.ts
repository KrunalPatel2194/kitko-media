import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArticleService } from '../services/api';
import { useCallback } from 'react';

export const useArticles = (searchQuery: string, currentPage: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['articles', searchQuery, currentPage],
    queryFn: () => ArticleService.list({
      search: searchQuery || undefined,
      page: currentPage,
      limit: 10
    })
  });

  const deleteMutation = useMutation({
    mutationFn: ArticleService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });

  const prefetchNextPage = useCallback(() => {
    if (data?.pagination?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ['articles', searchQuery, currentPage + 1],
        queryFn: () => ArticleService.list({
          search: searchQuery || undefined,
          page: currentPage + 1,
          limit: 10
        })
      });
    }
  }, [data, currentPage, queryClient, searchQuery]);

  return { data, isLoading, deleteMutation, prefetchNextPage };
};
