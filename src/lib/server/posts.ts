export type PostLanguage = 'en' | 'es';
export type PostKind = 'blog' | 'song-translation';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  language?: PostLanguage;
  kind?: PostKind;
  published?: boolean;
};

export type Post = {
  post_meta: PostMeta;
  content: any;
};

export const hasTag = (post: { tags?: string[] }, tag: string): boolean =>
  post.tags?.includes(tag) ?? false;

export const isSpanishPost = (post: { language?: string; tags?: string[] }): boolean =>
  post.language === 'es' || hasTag(post, 'es') || hasTag(post, 'spanish');

export const isHiddenPost = (post: { tags?: string[] }): boolean =>
  hasTag(post, 'hidden');

let _allPosts: PostMeta[] | null = null

const loadAllPostsOnce = (): PostMeta[] => {
  const modules = import.meta.glob('/src/lib/content/blogs/**/*.svx', { eager: true });

  const posts = Object.entries(modules).map(([path, mod]: any) => {
    const slug = path
      .replace('/src/lib/content/blogs/', '')
      .replace('.svx', '');
    const {
      title,
      date,
      summary,
      tags,
      language,
      kind,
      published = false
    } = mod.metadata || {}; // assume not published if not marked
    return { slug, title, date, summary, tags, language, kind, published } satisfies PostMeta;
  })
  .filter(p => p.title && p.date && p.published !== false)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export const getAllPosts = (): PostMeta[] => {
  if (_allPosts) return _allPosts;
  _allPosts = loadAllPostsOnce();
  return _allPosts;
}

export const getPost = async (slug: string): Promise<Post | null> => {
  console.log(`Slug inside getPost: ${slug}`);
  const modules = import.meta.glob('/src/lib/content/blogs/**/*.svx');
  const loader = modules[`/src/lib/content/blogs/${slug}.svx`];
  if (!loader) {
    console.log("Loader not found...");
    return null;
  }
  const mod: any = await loader();
  const post_meta = mod.metadata;
  const content = mod.default;
  return { post_meta, content } satisfies Post;
}
