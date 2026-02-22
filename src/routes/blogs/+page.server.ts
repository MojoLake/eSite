import { getAllPosts } from '$lib/server/posts';

const hasTag = (post: { tags?: string[] }, tag: string) =>
  post.tags?.includes(tag) ?? false;

const isSpanishPost = (post: { language?: string; tags?: string[] }) =>
  post.language === 'es' || hasTag(post, 'es') || hasTag(post, 'spanish');

export const load = async () => {
  const allPosts = getAllPosts();
  const regularPosts = allPosts.filter((post) => !isSpanishPost(post));
  const spanishPosts = allPosts.filter((post) => isSpanishPost(post));

  return {
    regularPosts,
    spanishPreviewPosts: spanishPosts.slice(0, 4)
  };
};
