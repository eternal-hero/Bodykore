import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface ArticleInfo {
  slug: string;
  title: string;
  description?: string;
  image?: { url: string };
  category?: {
    title: string;
    slug: string;
  };
  date: string;
  readTime?: number;
}

export const getAllArticles = async (
  first?: number
): Promise<ArticleInfo[]> => {
  const query = gql`
    query AllArticles($first: Int) {
      articles(first: $first) {
        slug
        title
        description
        image {
          url
        }
        category {
          title
          slug
        }
        date
        readTime
      }
    }
  `;
  const variables = {
    first,
  };
  const res = await graphcms.request(query, variables);
  return res.articles;
};

export interface ArticleSlug {
  slug: string;
}

export const getAllArticlesSlug = async (): Promise<ArticleSlug[]> => {
  const query = gql`
    query AllArticlesSlug {
      articles {
        slug
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.articles;
};

export interface Article {
  title: string;
  image?: { url: string };
  category?: { title: string };
  date: string;
  readTime?: number;
  content: { html: string };
}

export const getArticle = async (
  slug: string
): Promise<Article | undefined> => {
  const query = gql`
    query Article($slug: String!) {
      article(where: { slug: $slug }) {
        title
        image {
          url
        }
        category {
          title
        }
        date
        readTime
        content {
          html
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.article === null ? undefined : res.article;
};

export interface ArticleCategory {
  slug: string;
  title: string;
}

export const getArticleCategories = async (): Promise<ArticleCategory[]> => {
  const query = gql`
    query ArticleCategories {
      articleCategories {
        slug
        title
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.articleCategories;
};

export const getArticlesOfCategory = async (
  slug: string
): Promise<ArticleInfo[]> => {
  const query = gql`
    query ArticlesOfCategory($slug: String!) {
      articleCategory(where: { slug: $slug }) {
        articles {
          slug
          title
          image {
            url
          }
          category {
            title
          }
          date
          readTime
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.articleCategory === null ? [] : res.articleCategory.articles;
};
