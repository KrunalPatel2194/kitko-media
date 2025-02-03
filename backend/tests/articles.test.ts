import { beforeAll, describe, it, expect, afterAll, afterEach, beforeEach, jest, test } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import { Article } from '../src/models/Article';

jest.setTimeout(30000);

describe('Extended Article API Tests', () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    await Article.deleteMany({});
  });

  const validArticle = {
    title: 'Test Article',
    content: 'Test Content',
    author: 'Test Author',
    publishDate: new Date().toISOString(),
    category: 'mining' as const,
    status: 'draft' as const
  };

  describe('Search functionality /api/v1/articles', () => {
    beforeEach(async () => {
      // Create multiple articles for search testing
      await Article.create([
        {
          ...validArticle,
          title: 'Bitcoin Mining',
          content: 'Content about bitcoin mining',
          author: 'John Doe'
        },
        {
          ...validArticle,
          title: 'Ethereum News',
          content: 'Latest ethereum updates',
          author: 'Jane Smith',
          category: 'crypto'
        },
        {
          ...validArticle,
          title: 'Mining Equipment',
          content: 'New mining rigs',
          status: 'published'
        }
      ]);
    });

    test('should search articles by title', async () => {
      const response = await request(app)
        .get('/api/v1/articles')
        .query({ search: 'Bitcoin' });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Bitcoin Mining');
    });

    test('should search articles by content', async () => {
      const response = await request(app)
        .get('/api/v1/articles')
        .query({ search: 'ethereum' });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Ethereum News');
    });

    test('should search articles by author', async () => {
      const response = await request(app)
        .get('/api/v1/articles')
        .query({ search: 'Jane' });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].author).toBe('Jane Smith');
    });
  });

  describe('Combined filters /api/v1/articles', () => {
    beforeEach(async () => {
      await Article.create([
        {
          ...validArticle,
          title: 'Mining Article 1',
          status: 'published',
          category: 'mining'
        },
        {
          ...validArticle,
          title: 'Crypto Article 1',
          status: 'published',
          category: 'crypto'
        },
        {
          ...validArticle,
          title: 'Draft Mining Article',
          status: 'draft',
          category: 'mining'
        }
      ]);
    });

    test('should filter by both status and category', async () => {
      const response = await request(app)
        .get('/api/v1/articles')
        .query({
          status: 'published',
          category: 'mining'
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Mining Article 1');
    });

    test('should handle combined search and filters', async () => {
      const response = await request(app)
        .get('/api/v1/articles')
        .query({
          search: 'Draft',
          category: 'mining',
          status: 'draft'
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Draft Mining Article');
    });
  });

  

  describe('PUT /api/v1/articles/:id status transitions', () => {
    let articleId: string;

    beforeEach(async () => {
      const article = await Article.create(validArticle);
      articleId = article.id;
    });

    test('should update article status from draft to published', async () => {
      const response = await request(app)
        .put(`/api/v1/articles/${articleId}`)
        .send({
          status: 'published'
        });

      expect(response.status).toBe(200);
      expect(response.body.data.status).toBe('published');
    });

    test('should maintain other fields when updating status', async () => {
      const response = await request(app)
        .put(`/api/v1/articles/${articleId}`)
        .send({
          status: 'published'
        });

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(validArticle.title);
      expect(response.body.data.content).toBe(validArticle.content);
      expect(response.body.data.author).toBe(validArticle.author);
    });
  });

  
});