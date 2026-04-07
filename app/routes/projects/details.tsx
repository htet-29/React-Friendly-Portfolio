import type { Project } from '~/types';
import type { Route } from './+types/details';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

export async function clientLoader({ request, params }: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${params.id}`);
  if (!res.ok) throw new Response('Project not found', { status: 404 });

  const project: Project = await res.json();

  return project;
}

export function HydrationFallback() {
  return <div>Loading...</div>;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;

  return (
    <>
      <Link
        to="/projects"
        className="mb-6 flex items-center text-blue-400 transition hover:text-blue-500"
      >
        <FaArrowLeft className="mr-2" /> Back to Projects
      </Link>

      <div className="grid items-start gap-8 md:grid-cols-2">
        <div>
          <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="mb-4 text-3xl font-bold text-blue-400">{project.title}</h1>
          <p className="mb-4 text-sm text-gray-300">
            {new Date(project.date).toLocaleDateString()} · {project.category}
          </p>
          <p className="mb-6 text-gray-200">{project.description}</p>

          <a
            href={project.url}
            className="inline-block rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
            target="_blank"
          >
            View Live Site ➞
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
