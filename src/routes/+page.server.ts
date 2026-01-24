import { getAllPosts } from '$lib/server/posts';
import { getAllProjects } from '$lib/server/projects';

export const load = async() => {
  return { 
    posts: getAllPosts(),
    projects: getAllProjects()
  };
};
