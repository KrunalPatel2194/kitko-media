// src/services/ai.service.ts
import OpenAI from 'openai';
import { ApiError } from '../utils/ApiError';
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface ArticleMetadata {
  tags: string[];
  relatedCompanies: string[];
  keyPoints: string[];
}

export class AIService {
  private static async createCompletion(
    systemPrompt: string,
    userPrompt: string,
    retries = 3
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });
      return response.choices[0].message.content || '';
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.createCompletion(systemPrompt, userPrompt, retries - 1);
      }
      throw new ApiError('AI service error', 500, 'AI_SERVICE_ERROR');
    }
  }

  static async generateArticle(pressRelease: string): Promise<string> {
    const systemPrompt = "Professional financial news writer using AP and Kitco News style. Focus on key financial metrics, maintain professional tone, and highlight market implications.";
    return this.createCompletion(systemPrompt, `Convert to news article:\n${pressRelease}`);
  }

  static async translateToFrench(text: string): Promise<string> {
    const systemPrompt = "Professional financial translator. Maintain accurate financial terminology and formal tone.";
    return this.createCompletion(systemPrompt, `Translate to French:\n${text}`);
  }

  static async extractMetadata(content: string): Promise<ArticleMetadata> {
    const systemPrompt = "Financial content analyzer. Extract key information in JSON format.";
    const userPrompt = `
      Analyze this article and return:
      1. Tags (relevant companies, commodities, market terms)
      2. Related companies mentioned
      3. Key points (max 5)
      
      Article: ${content}
      
      Return as JSON with format: 
      {
        "tags": [],
        "relatedCompanies": [],
        "keyPoints": []
      }`;

    const response = await this.createCompletion(systemPrompt, userPrompt);
    try {
      return JSON.parse(response);
    } catch {
      throw new ApiError('Failed to parse AI response', 500, 'AI_PARSE_ERROR');
    }
  }

  static async generateSEOTitle(content: string, language: 'en' | 'fr'): Promise<string> {
    const systemPrompt = `SEO specialist for ${language === 'en' ? 'English' : 'French'} financial content`;
    return this.createCompletion(
      systemPrompt,
      `Generate SEO-friendly title (max 60 chars):\n${content.substring(0, 500)}`
    );
  }
  
}