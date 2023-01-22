import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface VideoCategory {
  title: string;
  slug: string;
  description: string;
}

export const getVideoCategories = async (): Promise<VideoCategory[]> => {
  const query = gql`
    query VideoCategories {
      videoCategories {
        title
        slug
        description
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.videoCategories;
};

export interface VideoInfo {
  title: string;
  video: string;
}

export const getVideosOfCategory = async (slug: string): Promise<VideoInfo> => {
  const query = gql`
    query VideosOfCategory($slug: String!) {
      videoCategory(where: { slug: $slug }) {
        videos {
          title
          video
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.videoCategory === null ? [] : res.videoCategory.videos;
};
