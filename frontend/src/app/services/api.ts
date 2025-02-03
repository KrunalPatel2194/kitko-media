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
    },

    // Add new enhanced methods
    listEnhanced: async (params?: { 
        search?: string;
        page?: number;
        limit?: number;
        language?: 'en' | 'fr';
        tags?: string[];
        companies?: string[];
        startDate?: string;
        endDate?: string;
    }) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append('search', params.search);
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.language) queryParams.append('language', params.language);
        if (params?.tags) queryParams.append('tags', params.tags.join(','));
        if (params?.companies) queryParams.append('companies', params.companies.join(','));
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);
        
        const { data } = await api.get(`/articles/search/advanced?${queryParams.toString()}`);
        return data;
    },

    getByIdEnhanced: async (id: string, language?: 'en' | 'fr'): Promise<Article> => {
        const { data } = await api.get(`/articles/${id}${language ? `?language=${language}` : ''}`);
        return data.data;
    },

    generateFromPressEnhanced: async (data: { 
        pressRelease: string;
        language?: 'en' | 'fr';
    }) => {
        const response = await api.post('/articles/generate', data);
        return response.data;
    }
};