import type { Project } from '~/types';
import ProjectCard from './ProjectCard';

type FeaturedProjectsProps = {
  projects: Project[];
  count: number;
};

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, count }) => {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, count);
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-gray-200">🌟 Featured Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
