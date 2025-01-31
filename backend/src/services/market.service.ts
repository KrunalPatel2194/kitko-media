import { Article } from "../models/Article";

// src/services/market.service.ts
export class MarketService {
    static async getMarketData(symbol: string) {
      const response = await fetch(`https://api.example.com/v1/markets/${symbol}`);
      return response.json();
    }
  
    static async updateArticleMarketData(articleId: string) {
      const article = await Article.findById(articleId);
      if (!article?.relatedCompanies?.length) return;
      
      const marketData = await Promise.all(
        article.relatedCompanies.map(company => this.getMarketData(company))
      );
      
      return Article.findByIdAndUpdate(articleId, { marketData });
    }
  }