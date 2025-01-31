import axios from 'axios';
import { Article, ArticleFilters, PaginatedResponse } from '../types/article';

const api = axios.create({
    baseURL: "/api/v1", // ✅ Fix: Ensures requests go through Next.js proxy
    withCredentials: true, // ✅ Allow cookies/session
  });

  export const ArticleService = {
    list: async (params?: { search?: string }) => {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      
      const { data } = await api.get(`/articles?${queryParams.toString()}`);
      return data;
    },

  getById: async (id: string): Promise<Article> => {
    const { data } = await api.get(`/articles/${id}`);
    return data.data;
  },

  create: async (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> => {
    const { data } = await api.post('/articles', article);
    return data.data;
  },

  update: async (id: string, article: Partial<Article>): Promise<Article> => {
    const { data } = await api.put(`/articles/${id}`, article);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/articles/${id}`);
  }
};