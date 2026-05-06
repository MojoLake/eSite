import { getAllPosts, isHiddenPost } from '$lib/server/posts';

export const load = async () => {
  return {
    hiddenPosts: getAllPosts().filter((post) => isHiddenPost(post))
  };
};
