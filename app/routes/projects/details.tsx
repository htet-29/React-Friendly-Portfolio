import type { Project } from '~/types';
import type { Route } from './+types/index';

export async function clientLoader({ request, params }: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`http://localhost:8000/projects/${params.id}`);
  if (!res.ok) throw new Response('Project not found', { status: 404 });

  const project: Project = await res.json();

  return project;
}

export function HydrationFallback() {
  return <div>Loading...</div>;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  console.log(project);

  return <div>Project Details</div>;
};

export default ProjectDetailsPage;
