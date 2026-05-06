import { getAllPosts, isHiddenPost, isSpanishPost } from '$lib/server/posts';
import { getAllProjects } from '$lib/server/projects';

export const load = async() => {
  return { 
    posts: getAllPosts().filter((post) => !isSpanishPost(post) && !isHiddenPost(post)),
    projects: getAllProjects()
  };
};
