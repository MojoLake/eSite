import { getAllPosts, isHiddenPost, isSpanishPost } from '$lib/server/posts';

export const load = async () => {
  const allPosts = getAllPosts().filter((post) => !isHiddenPost(post));
  const regularPosts = allPosts.filter((post) => !isSpanishPost(post));
  const spanishPosts = allPosts.filter((post) => isSpanishPost(post));

  return {
    regularPosts,
    spanishPreviewPosts: spanishPosts.slice(0, 4)
  };
};
