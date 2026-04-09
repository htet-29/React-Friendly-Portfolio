import type { PostMeta } from '~/types';
import type { Route } from './+types/index';
import PostCard from '~/components/PostCard';

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> => {
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  return { posts: data };
};

const Blog = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;

  return (
    <div className="mx-auto mt-10 max-w-3xl bg-gray-900 px-6 py-6">
      <h2 className="mb-8 text-3xl font-bold text-white">📑 Blogs</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Blog;
