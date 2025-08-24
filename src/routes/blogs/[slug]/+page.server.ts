import type { PageServerLoad } from './$types';
import { getPost } from '$lib/server/posts';

export const load: PageServerLoad = async ({ params }) => {
  console.log(`Params.slug: ${params.slug}`);
  const post = await getPost(params.slug);
  if (!post) {
    console.log("Post is null!");
    return null;
  }
  console.log(`Post content: ${post.content}`);
  return {
    slug: params.slug,
    title: post.post_meta.title,
    date: post.post_meta.date,
    summary: post.post_meta.summary,
  };
};
