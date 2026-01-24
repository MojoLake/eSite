type ProjectMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  liveUrl?: string;
  githubUrl?: string;
  relevancy?: number;
  published?: boolean;
};

export type Project = {
  project_meta: ProjectMeta;
  content: any;
};

let _allProjects: ProjectMeta[] | null = null;

const loadAllProjectsOnce = (): ProjectMeta[] => {
  const modules = import.meta.glob('/src/lib/content/projects/*.svx', { eager: true });

  const projects = Object.entries(modules).map(([path, mod]: any) => {
    const slug = path.split('/').pop()?.replace('.svx', '');
    const { title, date, summary, liveUrl, githubUrl, relevancy, published = false } = mod.metadata || {};
    return { slug, title, date, summary, liveUrl, githubUrl, relevancy, published } satisfies ProjectMeta;
  })
  .filter(p => p.title && p.date && p.published !== false)
  .sort((a, b) => {
    // Primary: sort by relevancy (higher first), treat undefined as lowest priority
    const relA = a.relevancy ?? -Infinity;
    const relB = b.relevancy ?? -Infinity;
    if (relA !== relB) return relB - relA;

    // Secondary: sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return projects;
}

export const getAllProjects = (): ProjectMeta[] => {
  if (!_allProjects) _allProjects = loadAllProjectsOnce();
  return _allProjects;
}

export const getProject = async (slug: string): Promise<Project | null> => {
  const project_meta: ProjectMeta = {
    slug: "drone",
    title: "Building a Drone",
    date: "14/05/2025",
    summary: "Me and my friends built a drone together",
    published: true,
  };
  const content = "this is the content";
  return { project_meta, content } satisfies Project;
}
