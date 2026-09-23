import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPost } from '$lib/server/posts';

export const load: PageServerLoad = async ({ params }) => {
  console.log(`Params.slug: ${params.slug}`);
  if (!params.slug) {
    return null;
  }
  const post = await getPost(params.slug);
  if (!post) {
    error(404, 'Post not found');
  }
  console.log(`Post content: ${post.content}`);
  return {
    slug: params.slug,
    title: post.post_meta.title,
    date: post.post_meta.date,
    summary: post.post_meta.summary,
  };
};
