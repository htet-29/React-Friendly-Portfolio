import type { Project, StrapiProjects, StrapiResponse } from '~/types';
import type { Route } from './+types/details';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

export async function loader({ request, params }: Route.LoaderArgs): Promise<{ project: Project }> {
  const { id } = params;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`,
  );
  if (!res.ok) throw new Response('Project not found', { status: 404 });

  const json: StrapiResponse<StrapiProjects> = await res.json();

  const item = json.data[0];

  const project: Project = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  };

  return { project };
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;

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
