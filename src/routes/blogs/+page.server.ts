import { getAllPosts } from '$lib/server/posts';

export const load = async () => {
  return { posts: getAllPosts() };
};
