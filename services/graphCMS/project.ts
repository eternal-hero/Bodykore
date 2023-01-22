import { gql } from 'graphql-request';
import { valuesIn } from 'lodash';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface ProjectCategory {
  slug: string;
  title: string;
}

export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
  const query = gql`
    query ProjectCategories {
      projectCategories {
        slug
        title
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.projectCategories;
};

export interface ProjectInfo {
  slug: string;
  title: string;
  image: [{ url: string }];
}

export const getProjectsOfCategory = async (
  slug: string,
  first: number
): Promise<ProjectInfo[]> => {
  const query = gql`
    query ProjectsOfCategory($slug: String!, $first: Int) {
      projectCategory(where: { slug: $slug }) {
        projects(first: $first) {
          slug
          title
          image(first: 1) {
            url
          }
        }
      }
    }
  `;
  const variables = {
    slug,
    first,
  };
  const res = await graphcms.request(query, variables);
  return res.projectCategory === null ? [] : res.projectCategory.projects;
};

export interface ProjectSlug {
  slug: string;
}

export const getAllProjectsSlug = async (): Promise<ProjectSlug[]> => {
  const query = gql`
    query AllProjectsSlug {
      projects {
        slug
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.projects;
};

export interface Project {
  title: string;
  subtitle: string;
  image: { url: string }[];
  products: { handle: string }[];
  related: ProjectInfo[];
}

export const getProject = async (slug: string): Promise<Project> => {
  const query = gql`
    query Project($slug: String!) {
      project(where: { slug: $slug }) {
        title
        subtitle
        image {
          url
        }
        products {
          handle
        }
        related {
          slug
          title
          image(first: 1) {
            url
          }
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.project === null ? undefined : res.project;
};


export interface ProjectCategoryHome {
  title: string,
  slug:string,
  projects: ProjectInfo[]
}
export const getProjectsOfCategoryHome = async (

): Promise<ProjectCategoryHome[]> => {
  const query = gql`
    query ProjectsOfCategoryHome() {
      projectCategories(where: {_search: "true"}) {
        title
        slug
        projects(first:1){
          slug
          title
          image {
            url
          }
        }
      }
    }
  `;

  const res = await graphcms.request(query);
  return res.projectCategories;
};
