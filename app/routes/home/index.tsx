import type { Route } from './+types/index';
import type { Project } from '~/types';
import FeaturedProjects from '~/components/FeaturedProjects';
import AboutPreview from '~/components/AboutPreview';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly Dev | Welcome' },
    { name: 'description', content: 'Custom website development' },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  if (!res.ok) throw new Response('projects not found', { status: 404 });

  const data = await res.json();

  return { projects: data };
};

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  );
};

export default Home;
