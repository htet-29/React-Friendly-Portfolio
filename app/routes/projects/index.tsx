import type { Project } from '~/types';
import type { Route } from './+types/index';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '~/components/ProjectCard';
import Pagination from '~/components/Pagination';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly Dev | Projects' },
    { name: 'description', content: 'My Projects Portfolio' },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();

  return { projects: data };
}
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const { projects } = loaderData as { projects: Project[] };

  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const projectsPerPage = 10;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold text-white">🚀 Projects</h2>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`cursor-pointer rounded px-3 py-1 text-sm ${category === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div layout key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </>
  );
};

export default ProjectsPage;
