import { getAllPosts } from '$lib/server/posts';

const hasTag = (post: { tags?: string[] }, tag: string) =>
  post.tags?.includes(tag) ?? false;

const isSpanishPost = (post: { language?: string; tags?: string[] }) =>
  post.language === 'es' || hasTag(post, 'es') || hasTag(post, 'spanish');

const isSongTranslationPost = (post: { kind?: string; tags?: string[] }) =>
  post.kind === 'song-translation' || hasTag(post, 'song-translation');

export const load = async () => {
  const spanishPosts = getAllPosts().filter((post) => isSpanishPost(post));

  return {
    spanishWritingPosts: spanishPosts.filter((post) => !isSongTranslationPost(post)),
    spanishSongTranslationPosts: spanishPosts.filter((post) => isSongTranslationPost(post))
  };
};
