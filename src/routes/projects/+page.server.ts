import { getAllProjects } from '$lib/server/projects';

export const load = async () => {
  return { projects: getAllProjects() };
};
