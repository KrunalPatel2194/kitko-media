// src/services/openai.service.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const OpenAIService = {
  generateArticle: async (pressRelease: string) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a professional financial news writer using AP and Kitco News style."
      }, {
        role: "user",
        content: `Convert this press release into a 500-word news article: ${pressRelease}`
      }]
    });
    return response.choices[0].message.content;
  },

  translate: async (content: string) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a professional financial translator."
      }, {
        role: "user",
        content: `Translate to French, maintaining financial terminology: ${content}`
      }]
    });
    return response.choices[0].message.content;
  }
};