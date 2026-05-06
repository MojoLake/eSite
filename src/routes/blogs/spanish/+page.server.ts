import { getAllPosts, hasTag, isHiddenPost, isSpanishPost } from '$lib/server/posts';

const isSongTranslationPost = (post: { kind?: string; tags?: string[] }) =>
  post.kind === 'song-translation' || hasTag(post, 'song-translation');

export const load = async () => {
  const spanishPosts = getAllPosts().filter((post) => isSpanishPost(post) && !isHiddenPost(post));

  return {
    spanishWritingPosts: spanishPosts.filter((post) => !isSongTranslationPost(post)),
    spanishSongTranslationPosts: spanishPosts.filter((post) => isSongTranslationPost(post))
  };
};
