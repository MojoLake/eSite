import { getAllPosts } from '$lib/server/posts';

export const load = async () => {
  const allPosts = getAllPosts();
  const regularPosts = allPosts.filter((post) => post.language !== 'es');
  const spanishPosts = allPosts.filter((post) => post.language === 'es');

  return {
    regularPosts,
    spanishPreviewPosts: spanishPosts.slice(0, 4)
  };
};
