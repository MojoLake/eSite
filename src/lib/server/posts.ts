type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  published?: boolean;
};

export type Post = {
  post_meta: PostMeta;
  content: any;
};

let _allPosts: PostMeta[] | null = null

const loadAllPostsOnce = (): PostMeta[] => {
  const modules = import.meta.glob('/src/lib/content/blogs/*.svx', { eager: true });

  const posts = Object.entries(modules).map(([path, mod]: any) => {
    const slug = path.split('/').pop()?.replace('svx', '');
    const { title, date, summary, tags, published = true } = mod.metadata || {};
    return { slug, title, date, summary, tags, published} satisfies PostMeta;
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
  const modules = import.meta.glob('/src/lib/content/blogs/*.svx');
  const loader = modules[`/src/lib/content/blogs/${slug}.svx`];
  if (!loader) {
    console.log("Loader not found...");
    return null;
  }
  const mod: any = await loader();
  const post_meta = mod.metadata;
  const content = mod.default
  return { post_meta, content } satisfies Post;
}

