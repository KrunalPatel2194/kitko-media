// src/models/Article.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IArticle } from '../types/article.types';

export interface IArticleDocument extends Omit<IArticle, 'id'>, Document {}

const articleSchema = new Schema<IArticleDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    publishDate: {
      type: Date,
      required: [true, 'Publish date is required']
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'published'],
        message: '{VALUE} is not a valid status'
      },
      default: 'draft'
    },
    category: {
      type: String,
      enum: {
        values: ['mining', 'crypto'],
        message: '{VALUE} is not a valid category'
      },
      required: [true, 'Category is required']
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

articleSchema.index({ status: 1, category: 1 });
articleSchema.index({ publishDate: -1 });
articleSchema.index({ createdAt: -1 });

export const Article = mongoose.model<IArticleDocument>('Article', articleSchema);