import { Link } from 'react-router';
import type { Project } from '~/types';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      className="block h-full transform transition duration-300 hover:scale-[1.02]"
      to={`/projects/${project.documentId}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-sm transition hover:shadow-md">
        <img src={project.image} alt={project.title} className="h-40 w-full object-cover" />
        <div className="flex grow flex-col justify-between p-5">
          <h3 className="mb-1 text-3xl font-semibold text-blue-400">{project.title}</h3>
          <p className="mb-2 text-sm text-gray-300">{project.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{project.category}</span>
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
