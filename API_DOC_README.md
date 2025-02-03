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

To obtain a token, use the authentication endpoints below.

## Endpoints

### Authentication

#### Register New User
```http
POST /auth/register

Request:
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login
```http
POST /auth/login

Request:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### News Articles

#### Get All Articles
```http
GET /articles

Query Parameters:
- page (optional): Current page number (default: 1)
- limit (optional): Items per page (default: 10)
- category (optional): Filter by category
- search (optional): Search in title and content

Response: 200 OK
{
  "data": [
    {
      "id": "article_id",
      "title": "Article Title",
      "content": "Article content...",
      "category": "Technology",
      "author": {
        "id": "author_id",
        "name": "Author Name"
      },
      "createdAt": "2024-02-02T12:00:00Z",
      "updatedAt": "2024-02-02T12:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50
  }
}
```

#### Get Single Article
```http
GET /articles/:id

Response: 200 OK
{
  "data": {
    "id": "article_id",
    "title": "Article Title",
    "content": "Article content...",
    "category": "Technology",
    "author": {
      "id": "author_id",
      "name": "Author Name"
    },
    "createdAt": "2024-02-02T12:00:00Z",
    "updatedAt": "2024-02-02T12:00:00Z"
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
  "content": "Article content...",
  "category": "Technology"
}

Response: 201 Created
{
  "message": "Article created successfully",
  "data": {
    "id": "new_article_id",
    "title": "New Article Title",
    "content": "Article content...",
    "category": "Technology",
    "author": {
      "id": "author_id",
      "name": "Author Name"
    },
    "createdAt": "2024-02-02T12:00:00Z",
    "updatedAt": "2024-02-02T12:00:00Z"
  }
}
```

#### Update Article
```http
PUT /articles/:id
Authorization: Required

Request:
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Science"
}

Response: 200 OK
{
  "message": "Article updated successfully",
  "data": {
    "id": "article_id",
    "title": "Updated Title",
    "content": "Updated content...",
    "category": "Science",
    "author": {
      "id": "author_id",
      "name": "Author Name"
    },
    "updatedAt": "2024-02-02T12:30:00Z"
  }
}
```

#### Delete Article
```http
DELETE /articles/:id
Authorization: Required

Response: 200 OK
{
  "message": "Article deleted successfully"
}
```

## Error Codes and Meanings

### Client Error Responses (4xx)

- `400 Bad Request`
  - Invalid request payload
  - Missing required fields
  - Invalid query parameters

- `401 Unauthorized`
  - Missing authentication token
  - Invalid authentication token
  - Expired token

- `403 Forbidden`
  - Valid token but insufficient permissions
  - Attempting to modify another user's content

- `404 Not Found`
  - Resource not found
  - Invalid endpoint

- `422 Unprocessable Entity`
  - Validation error
  - Business logic error

- `429 Too Many Requests`
  - Rate limit exceeded

### Server Error Responses (5xx)

- `500 Internal Server Error`
  - Unexpected server error
  - Database error

- `503 Service Unavailable`
  - Server is temporarily unable to handle the request
  - Maintenance mode

## Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Specific field error description"
    }
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Window: 15 minutes
- Max Requests: 100 per window
- Headers provided:
  - `X-RateLimit-Limit`: Max requests allowed per window
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Data Validation

- String fields have maximum lengths
- Dates must be in ISO 8601 format
- IDs must be valid MongoDB ObjectIds
- Categories must be one of predefined values

## Support

For API-related issues and feature requests, please create an issue in the [GitHub repository](https://github.com/KrunalPatel2194/kitko-media/issues).