// src/services/ai.service.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AIService {
  static async generateArticle(pressRelease: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a professional financial news writer using AP and Kitco News style."
      }, {
        role: "user",
        content: `Convert this press release into a news article:\n\n${pressRelease}`
      }]
    });
    
    return response.choices[0].message.content;
  }

  static async translateToFrench(text: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a professional financial translator."
      }, {
        role: "user",
        content: `Translate to French, maintaining financial terminology:\n\n${text}`
      }]
    });

    return response.choices[0].message.content;
  }

  static async generateTags(content: string | null): Promise<string[]> {
    if (!content) return [];
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "Extract relevant tags and company names from financial content."
      }, {
        role: "user",
        content: `Extract key topics and company names as tags:\n\n${content}`
      }]
    });
  
    return (response.choices[0].message.content?.split(',') || []).map(tag => tag.trim());
  }
}