// src/types/article.ts
export interface Article {
  id: string;
  title: string;
  status: 'published' | 'draft';
  createdAt: string;
  author: string;
  content: string;
}

// src/hooks/useToast.ts
import { useState, useCallback } from 'react';

export interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, showToast };
};