type PostMeta = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

export type Post = {
  slug: string;
  metadata: PostMeta;
};

