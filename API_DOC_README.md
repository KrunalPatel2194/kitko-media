# News Management System - API Documentation

## Project Repository
[https://github.com/KrunalPatel2194/kitko-media.git](https://github.com/KrunalPatel2194/kitko-media.git)

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication

The API uses JWT (JSON Web Token) based authentication.

Include the token in all authenticated requests:
```
Authorization: Bearer <your_jwt_token>
```

## Bilingual Content Management

### Language Support
- Supported languages: English (en), French (fr)
- Bilingual content storage
- Automatic translation services
- Language-specific search and retrieval

## Endpoints

### Articles

#### Get Articles (Enhanced)
```http
GET /articles

Query Parameters:
- page (optional): Current page number (default: 1)
- limit (optional): Items per page (default: 10)
- status (optional): Filter by article status (draft/published)
- category (optional): Filter by category (mining/crypto)
- search (optional): Search in title and content
- language (optional): Language of search (en/fr, default: en)

Response: 200 OK
{
  "data": [
    {
      "id": "article_id",
      "title": "Article Title",
      "titleFr": "Titre de l'article",
      "content": "Article content...",
      "contentFr": "Contenu de l'article...",
      "category": "Technology",
      "language": "en",
      "tags": ["tech", "innovation"],
      "relatedCompanies": ["Company A", "Company B"]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50
  }
}
```

#### Get Single Article (Multilingual)
```http
GET /articles/:id

Query Parameters:
- language (optional): Specify language (en/fr, default: en)

Response: 200 OK
{
  "data": {
    "id": "article_id",
    "title": "Article Title",
    "titleFr": "Titre de l'article",
    "content": "Article content...",
    "contentFr": "Contenu de l'article...",
    "category": "Technology",
    "marketData": {
      "Company A": {
        "price": 100.50,
        "marketCap": 1000000,
        "change24h": 2.5
      }
    }
  }
}
```

#### Create Article
```http
POST /articles
Authorization: Required

Request:
{
  "title": "New Article Title",
  "titleFr": "Titre du nouvel article",
  "content": "Article content...",
  "contentFr": "Contenu de l'article...",
  "category": "Technology",
  "tags": ["tech", "innovation"],
  "relatedCompanies": ["Company A"]
}
```

#### Advanced Article Search
```http
GET /articles/search/advanced

Query Parameters:
- tags (optional): Comma-separated list of tags
- companies (optional): Comma-separated list of companies
- startDate (optional): Start date for publication
- endDate (optional): End date for publication
- language (optional): Language preference

Response: Similar to Get Articles
```

### AI-Powered Article Generation

#### Generate Article from Press Release
```http
POST /articles/generate
Authorization: Required

Request:
{
  "pressRelease": "Full press release text...",
  "language": "en" // Optional, default: en
}

Response: 201 Created
{
  "data": {
    "id": "generated_article_id",
    "title": "Generated Article Title",
    "titleFr": "Titre de l'article généré",
    "content": "AI-generated article content...",
    "contentFr": "Contenu de l'article généré...",
    "tags": ["generated", "ai"],
    "relatedCompanies": ["Company A"],
    "status": "draft"
  }
}
```

### Market Data

#### Get Market Data
```http
GET /market/data

Query Parameters:
- symbols: Comma-separated list of company symbols

Response:
{
  "Company A": {
    "price": 100.50,
    "marketCap": 1000000,
    "change24h": 2.5
  },
  "Company B": {
    "price": 75.25,
    "marketCap": 500000,
    "change24h": -1.2
  }
}
```

## Rate Limiting

- General API Endpoints: 100 requests per 15 minutes
- AI Generation Endpoints: Stricter limits to prevent abuse
- Market Data Endpoints: Controlled access

## Error Handling

Standard error response format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Detailed error description",
    "details": {
      "field": "Specific error details"
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Invalid input
- `AUTHENTICATION_ERROR`: Authentication failure
- `ARTICLE_NOT_FOUND`: Resource not found
- `AI_SERVICE_ERROR`: AI generation failed
- `MARKET_DATA_ERROR`: Market data retrieval issue

## AI Service Details

### Translation Capabilities
- Press release to article conversion
- Bilingual content generation
- SEO title creation
- Metadata extraction

### Supported Languages
- English (en)
- French (fr)

## Best Practices

1. Always include language parameter for multilingual content
2. Use AI generation endpoints sparingly
3. Implement client-side caching
4. Handle potential translation fallbacks

## Changelog
- v1.1.0: Added bilingual support
- v1.2.0: Enhanced AI article generation
- v1.3.0: Market data integration
