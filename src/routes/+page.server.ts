import { getAllPosts } from '$lib/server/posts';
import { getAllProjects } from '$lib/server/projects';

const hasTag = (post: { tags?: string[] }, tag: string) =>
  post.tags?.includes(tag) ?? false;

const isSpanishPost = (post: { language?: string; tags?: string[] }) =>
  post.language === 'es' || hasTag(post, 'es') || hasTag(post, 'spanish');

export const load = async() => {
  return { 
    posts: getAllPosts().filter((post) => !isSpanishPost(post)),
    projects: getAllProjects()
  };
};
