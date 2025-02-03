import axios from 'axios';
import { Article } from '../types/article';

const api = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
});

export const ArticleService = {
    list: async (params?: { 
        search?: string;
        page?: number;
        limit?: number;
    }) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append('search', params.search);
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', (params.limit || 10).toString());
        
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
    },

    generateFromPress: async (data: { pressRelease: string }) => {
        const response = await api.post('/articles/generate', data);
        return response.data;
    }
};