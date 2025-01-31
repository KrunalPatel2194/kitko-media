// src/services/ai.service.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AIService {
  static async generateArticle(pressRelease: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed from gpt-4
      messages: [
        { role: "system", content: "Professional financial news writer using AP and Kitco News style" },
        { role: "user", content: `Convert to news article:\n${pressRelease}` }
      ]
    });
    return response.choices[0].message.content || '';
  }

  static async translateToFrench(text: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed from gpt-4
      messages: [
        { role: "system", content: "Professional financial translator" },
        { role: "user", content: `Translate to French:\n${text}` }
      ]
    });
    return response.choices[0].message.content || '';
  }
}