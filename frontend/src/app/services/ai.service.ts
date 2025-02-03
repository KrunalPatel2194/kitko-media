// src/services/ai.service.ts
import OpenAI from 'openai';
console.log("API Key:", process.env.NEXT_PUBLIC_OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class AIService {
  static async generateArticle(pressRelease: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Professional financial news writer using AP and Kitco News style" },
        { role: "user", content: `Convert to news article:\n${pressRelease}` }
      ]
    });
    return response.choices[0].message.content;
  }

  static async translateToFrench(text: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Professional financial translator" },
        { role: "user", content: `Translate to French:\n${text}` }
      ]
    });
    return response.choices[0].message.content;
  }
    // Existing methods...
  
    static async extractMetadata(content: string)  {
      // Define lists of potential tags and companies
      const potentialTags = [
        'mining', 'crypto', 'technology', 'finance', 
        'sustainability', 'innovation', 'investment'
      ];
  
      const potentialCompanies = [
        'Rio Tinto', 'BHP', 'Glencore', 'Vale', 
        'Barrick Gold', 'Newmont', 'Freeport-McMoRan'
      ];
  
      // Extract tags based on content keywords
      const tags = potentialTags.filter(tag => 
        content.toLowerCase().includes(tag.toLowerCase())
      );
  
      // Extract companies mentioned in the content
      const relatedCompanies = potentialCompanies.filter(company => 
        content.toLowerCase().includes(company.toLowerCase())
      );
  
      return {
        tags,
        relatedCompanies
      };
    }
    static async generateSEOTitle(content: string, language: 'en' | 'fr') {
      if (!content) {
        // Fallback to a generic title if content is null or empty
        return language === 'en' 
          ? 'Latest Industry News' 
          : 'Actualités Industrielles Récentes';
      }
  
      const keyWords = content
        .split(' ')
        .filter(word => word.length > 3)
        .slice(0, 5)
        .join(' ');
  
      const seoTitles = {
        en: [
          `${keyWords} - Latest Industry Insights`,
          `Breaking News: ${keyWords}`,
          `Key Developments in ${keyWords}`
        ],
        fr: [
          `${keyWords} - Dernières Perspectives de l'Industrie`,
          `Nouvelles Importantes : ${keyWords}`,
          `Développements Clés dans ${keyWords}`
        ]
      };
  
      const titles = seoTitles[language];
      return titles[Math.floor(Math.random() * titles.length)];
    }
}