type ProjectMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  published?: boolean;
};

export type Project = {
  project_meta: ProjectMeta;
  content: any;
};

let _allProjects: ProjectMeta | null = null;

const loadAllProjectsOnce = (): ProjectMeta[] => {
  const modules = import.meta.glob('/src/lib/content/projects/*.svx', { eager: true });

  const projects = Object.entries(modules).map(([path, mod]: any) => {
    const slug = path.split('/').pop()?.replace('.svx', '');
    const { title, date, summary, published = false } = mod.metadata || {}; // assume not published if not marked
    return { slug, title, date, summary, published } satisfies ProjectMeta;
  })
  .filter(p => p.title && p.date && p.published !== false)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
