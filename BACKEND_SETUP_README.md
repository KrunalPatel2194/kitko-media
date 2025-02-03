# News Management System - Backend Setup

## Project Repository
[https://github.com/KrunalPatel2194/kitko-media.git](https://github.com/KrunalPatel2194/kitko-media.git)

## Features

### Core Backend Features
- RESTful API for article management
- MongoDB integration
- Authentication and authorization
- Comprehensive error handling
- Logging and monitoring

### New Advanced Features
- **Bilingual Content Management**
  - Multilingual article storage and retrieval
  - Language-specific content validation
  - Automatic translation support
- AI-powered Article Generation
  - Press release to article conversion
  - Intelligent content extraction
  - Bilingual title and content generation
- Market Data Integration
  - Real-time financial data retrieval
  - WebSocket updates
  - Company and market metadata extraction

## Bilingual Implementation Details

### Database Schema Enhancement
```typescript
interface Article {
  title: string;          // English title
  titleFr: string;        // French title
  content: string;        // English content
  contentFr: string;      // French content
  language: 'en' | 'fr';  // Primary language
  tags: string[];
  relatedCompanies: string[];
}
```

### Translation and AI Services
- OpenAI API integration for:
  - Automated translations
  - Content generation
  - SEO title creation
- Fallback mechanisms for missing translations
- Intelligent content parsing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js >= 18.0.0
- MongoDB
- npm or yarn package manager
- Git
- OpenAI API Key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/KrunalPatel2194/kitko-media.git
cd kitko-media/backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Environment Setup:
Create a `.env` file in the backend root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/news_management

# Authentication
JWT_SECRET=your_jwt_secret_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Language Services
TRANSLATION_SERVICE_URL=https://translation.googleapis.com

# WebSocket Configuration
WS_PORT=5001

# Logging and Monitoring
LOG_LEVEL=debug
ENABLE_AI_GENERATION=true
```

## API Endpoints for Bilingual Content

### Article Endpoints
- `GET /api/articles` - List articles with language support
- `GET /api/articles/:id?lang=en|fr` - Retrieve article in specific language
- `POST /api/articles/generate` - AI-powered article generation
- `POST /api/articles/translate` - Manual translation endpoint

### Language and Translation Endpoints
- `POST /api/translate` - Translate content between languages
- `GET /api/languages/supported` - List supported languages
- `POST /api/seo/generate-title` - Generate SEO-friendly titles

## Running the Application

Development mode with hot reload:
```bash
npm run dev
# or
yarn dev
```

Production mode:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## AI Article Generation Workflow
1. Receive press release text
2. Extract key information
3. Generate English content
4. Translate to French
5. Create SEO-optimized titles
6. Extract tags and related companies
7. Store bilingual article

## Testing

1. Run all tests:
```bash
npm test
```

2. Run tests with AI generation:
```bash
ENABLE_AI_TESTS=true npm test
```

## Project Structure
```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Bilingual request handlers
│   │   ├── articleController.ts
│   │   └── translationController.ts
│   ├── services/     # Business logic
│   │   ├── aiService.ts
│   │   ├── translationService.ts
│   │   └── marketDataService.ts
│   ├── models/       # Enhanced Mongoose models
│   └── utils/        # Utility functions
│       ├── languageHelper.ts
│       └── aiUtils.ts
├── tests/            # Comprehensive test suite
└── package.json      # Dependencies and scripts
```

## Debugging AI and Translation Services

Enable verbose logging:
```bash
DEBUG=ai:*,translation:* npm run dev
```

## Performance Considerations
- Implement caching for translations
- Use connection pooling for MongoDB
- Optimize AI generation requests
- Implement rate limiting on AI endpoints

## Common Troubleshooting

1. OpenAI API Issues
```bash
# Check API key configuration
echo $OPENAI_API_KEY

# Verify network connectivity
curl https://api.openai.com/v1/models
```

2. MongoDB Connection
```bash
# Check MongoDB service
sudo systemctl status mongodb

# Verify connection string
mongo $MONGODB_URI
```

## Future Roadmap
- Enhanced AI content analysis
- More granular language support
- Machine learning-powered translation improvements
- Real-time collaborative translation

## Support and Contributions
- Report issues on GitHub
- Pull requests welcome
- Follow contribution guidelines
