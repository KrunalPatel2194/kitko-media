// src/services/market.service.ts
import axios from 'axios';
import { Article } from '../types/article';

interface MarketData {
  price: number;
  marketCap: number;
  change24h: number;
}

export class MarketService {
  private static api = axios.create({
    baseURL: '/api/v1/market',
  });

  static async getMarketData(symbols: string[]): Promise<Record<string, MarketData>> {
    const { data } = await this.api.get('/quotes', {
      params: { symbols: symbols.join(',') }
    });
    return data;
  }

  static async getArticleMarketData(article: Article): Promise<MarketData | null> {
    if (!article.relatedCompanies?.length) return null;
    
    try {
      const marketData = await this.getMarketData(article.relatedCompanies);
      return marketData[article.relatedCompanies[0]] || null;
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      return null;
    }
  }

  static async subscribeToMarketUpdates(
    symbols: string[], 
    onUpdate: (data: Record<string, MarketData>) => void
  ): Promise<() => void> {
    // WebSocket connection setup
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/market`);
    
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'subscribe', symbols }));
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    return () => ws.close();
  }
  static async updateArticleMarketData(articleId: string) {
    try {
      const response = await axios.post(`/api/market/article/${articleId}/update`);
      return response.data;
    } catch (error) {
      console.error('Failed to update market data:', error);
      throw error;
    }
  }
}

export default MarketService;