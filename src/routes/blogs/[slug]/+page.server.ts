import type { PageServerLoad } from './$types';
import type { Post } from '$lib/server/posts';
import { getPost } from '$lib/server/posts';

export const load: PageServerLoad = async ({ params }) => {
  return {
    post: await getPost(params.slug),
    title: "moi",
  };
};
