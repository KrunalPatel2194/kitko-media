// src/services/market.service.ts
import { Article } from '../models/Article';
import { ApiError } from '../utils/ApiError';

interface MarketData {
  price: number;
  marketCap: number;
  change24h: number;
}

export class MarketService {
  private static async fetchMarketData(symbol: string): Promise<MarketData> {
    try {
      const response = await fetch(`${process.env.MARKET_API_URL}/v1/quotes/${symbol}`, {
        headers: {
          'Authorization': `Bearer ${process.env.MARKET_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`Market API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        price: data.price,
        marketCap: data.marketCap,
        change24h: data.change24h
      };
    } catch (error) {
      console.error(`Failed to fetch market data for ${symbol}:`, error);
      return {
        price: 0,
        marketCap: 0,
        change24h: 0
      };
    }
  }

  static async updateArticleMarketData(articleId: string): Promise<void> {
    const article = await Article.findById(articleId);
    if (!article?.relatedCompanies?.length) {
      return;
    }

    try {
      const marketDataPromises = article.relatedCompanies.map(async (company) => {
        const data = await this.fetchMarketData(company);
        return { [company]: data };
      });

      const marketDataResults = await Promise.all(marketDataPromises);
      const marketData = marketDataResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});

      await Article.findByIdAndUpdate(articleId, { marketData });
    } catch (error) {
      console.error('Failed to update market data:', error);
      throw new ApiError('Failed to update market data', 500, 'MARKET_DATA_ERROR');
    }
  }

  static async getMarketData(symbols: string[]): Promise<Record<string, MarketData>> {
    try {
      const marketDataPromises = symbols.map(symbol => this.fetchMarketData(symbol));
      const marketDataResults = await Promise.all(marketDataPromises);
      
      return symbols.reduce((acc, symbol, index) => ({
        ...acc,
        [symbol]: marketDataResults[index]
      }), {});
    } catch (error) {
      throw new ApiError('Failed to fetch market data', 500, 'MARKET_DATA_ERROR');
    }
  }
}