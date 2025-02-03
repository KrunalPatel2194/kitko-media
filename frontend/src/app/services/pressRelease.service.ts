// src/services/pressRelease.service.ts
import { ArticleService } from './api';
import { AIService } from './ai.service';
import { MarketService } from './market.service';

export const PressReleaseService = {
  async generateFullArticle(pressRelease: string) {
    // Generate main content
    const content = await AIService.generateArticle(pressRelease);
    
    if (!content) {
      throw new Error('Failed to generate article content');
    }
    
    // Extract metadata
    const metadata = await AIService.extractMetadata(content);
    
    // Generate SEO title and French translation
    const [titleEn, contentFr] = await Promise.all([
      AIService.generateSEOTitle(content, 'en'),
      AIService.translateToFrench(content)
    ]);
    
    // Ensure contentFr is not null before generating title
    const safeContentFr = contentFr || content;
    const titleFr = await AIService.generateSEOTitle(safeContentFr, 'fr');

    // Create article
    const article = await ArticleService.create({
      title: titleEn,
      titleFr: titleFr || titleEn,
      content,
      contentFr: safeContentFr,
      author: "AI Generator",
      publishDate: new Date().toISOString(),
      status: 'draft',
      category: 'mining',
      tags: metadata.tags || [],
      relatedCompanies: metadata.relatedCompanies || []
    });

    // Update market data in background
    if (metadata.relatedCompanies?.length) {
      MarketService.updateArticleMarketData(article.id)
        .catch(console.error);
    }

    return article;
  }
};