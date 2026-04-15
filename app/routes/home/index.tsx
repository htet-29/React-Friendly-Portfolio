import type { Route } from './+types/index';
import type { Post, Project, StrapiPosts, StrapiProjects, StrapiResponse } from '~/types';
import FeaturedProjects from '~/components/FeaturedProjects';
import AboutPreview from '~/components/AboutPreview';
import LatestPosts from '~/components/LatestPosts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly Dev | Welcome' },
    { name: 'description', content: 'Custom website development' },
  ];
}

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> => {
  const url = new URL(request.url);

  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
    fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`),
  ]);

  if (!projectRes.ok || !postRes.ok) throw new Error('failed to fetch projects or posts');

  const projectJSON: StrapiResponse<StrapiProjects> = await projectRes.json();
  const postJSON: StrapiResponse<StrapiPosts> = await postRes.json();

  const projects = projectJSON.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  const posts = postJSON.data.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
  }));

  return { projects, posts };
};

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData as { projects: Project[]; posts: Post[] };

  return (
    <>
      <FeaturedProjects projects={projects} />
      <LatestPosts posts={posts} />
      <AboutPreview />
    </>
  );
};

export default Home;
