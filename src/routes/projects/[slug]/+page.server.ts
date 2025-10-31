import type { PageServerLoad } from './$types';
import { getProject } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params }) => {
  console.log(`Projects params.slug: ${params.slug}`);
  const post = await getProject(params.slug);
  if (!post) {
    console.log("Project is null!!");
    return null;
  }

  return {
    slug: params.slug,
    title: post.project_meta.title,
  }
}
