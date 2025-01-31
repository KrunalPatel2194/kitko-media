
import { beforeAll, describe, it, expect,afterAll ,afterEach,beforeEach, jest, test} from '@jest/globals';
// tests/articles.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import { Article } from '../src/models/Article';

jest.setTimeout(30000);

describe('Article API Endpoints', () => {
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

  describe('POST /api/v1/articles', () => {
    test('should create a new article', async () => {
      const response = await request(app)
        .post('/api/v1/articles')
        .send(validArticle);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(validArticle.title);
      expect(response.body.data.content).toBe(validArticle.content);
      expect(response.body.data.author).toBe(validArticle.author);
      expect(response.body.data.category).toBe(validArticle.category);
      expect(response.body.data.status).toBe(validArticle.status);
    });

    test('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/v1/articles')
        .send({});

      console.log("API Response:", response.body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.fields).toBeDefined();
      expect(Object.keys(response.body.error.fields)).toContain('title');
      expect(Object.keys(response.body.error.fields)).toContain('content');
      expect(Object.keys(response.body.error.fields)).toContain('author');
      expect(Object.keys(response.body.error.fields)).toContain('publishDate');
      expect(Object.keys(response.body.error.fields)).toContain('category');
    });

    test('should validate category field', async () => {
      const response = await request(app)
        .post('/api/v1/articles')
        .send({
          ...validArticle,
          category: 'invalid'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.fields.category).toBeDefined();
    });
  });

  describe('GET /api/v1/articles', () => {
    beforeEach(async () => {
      await Article.create(validArticle);
    });

    test('should return paginated articles', async () => {
      const response = await request(app)
        .get('/api/v1/articles');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination).toHaveProperty('currentPage');
      expect(response.body.pagination).toHaveProperty('totalPages');
      expect(response.body.pagination).toHaveProperty('totalItems');
    });

    test('should filter by category', async () => {
      const response = await request(app)
        .get('/api/v1/articles')
        .query({ category: 'mining' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data[0].category).toBe('mining');
    });

    test('should filter by status', async () => {
      const response = await request(app)
        .get('/api/v1/articles')
        .query({ status: 'draft' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data[0].status).toBe('draft');
    });

    test('should handle pagination', async () => {
      // Create additional articles
      await Article.create({
        ...validArticle,
        title: 'Second Article'
      });

      const response = await request(app)
        .get('/api/v1/articles')
        .query({ page: 1, limit: 1 });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.pagination.currentPage).toBe(1);
      expect(response.body.pagination.totalPages).toBe(2);
      expect(response.body.pagination.totalItems).toBe(2);
    });
  });

  describe('GET /api/v1/articles/:id', () => {
    let articleId: string;

    beforeEach(async () => {
      const article = await Article.create(validArticle);
      articleId = article.id;
    });

    test('should return article by id', async () => {
      const response = await request(app)
        .get(`/api/v1/articles/${articleId}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('id', articleId);
      expect(response.body.data.title).toBe(validArticle.title);
    });

    test('should return 404 for non-existent article', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/v1/articles/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('ARTICLE_NOT_FOUND');
    });
  });

  describe('PUT /api/v1/articles/:id', () => {
    let articleId: string;

    beforeEach(async () => {
      const article = await Article.create(validArticle);
      articleId = article.id;
    });

    test('should update article', async () => {
      const updates = {
        title: 'Updated Title',
        content: 'Updated Content'
      };

      const response = await request(app)
        .put(`/api/v1/articles/${articleId}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(updates.title);
      expect(response.body.data.content).toBe(updates.content);
    });

    test('should validate update fields', async () => {
      const response = await request(app)
        .put(`/api/v1/articles/${articleId}`)
        .send({ category: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('DELETE /api/v1/articles/:id', () => {
    let articleId: string;

    beforeEach(async () => {
      const article = await Article.create(validArticle);
      articleId = article.id;
    });

    test('should delete article', async () => {
      const response = await request(app)
        .delete(`/api/v1/articles/${articleId}`);

      expect(response.status).toBe(204);

      const articleExists = await Article.findById(articleId);
      expect(articleExists).toBeNull();
    });

    test('should return 404 for non-existent article', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/v1/articles/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('ARTICLE_NOT_FOUND');
    });
  });
});