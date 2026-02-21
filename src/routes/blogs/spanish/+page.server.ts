import { getAllPosts } from '$lib/server/posts';

export const load = async () => {
  const spanishPosts = getAllPosts().filter((post) => post.language === 'es');

  return {
    spanishWritingPosts: spanishPosts.filter((post) => post.kind !== 'song-translation'),
    spanishSongTranslationPosts: spanishPosts.filter((post) => post.kind === 'song-translation')
  };
};
