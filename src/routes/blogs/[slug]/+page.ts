import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    post: {
      title: `Title for ${params.slug} here!`,
      content: `Content for ${params.slug} herr!`
    }
  };
};
