import type { Post, StrapiPosts, StrapiResponse } from '~/types';
import type { Route } from './+types/index';
import PostCard from '~/components/PostCard';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import PostFilter from '~/components/PostFilter';

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ posts: Post[] }> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`);

  if (!res.ok) throw new Error('Failed to fetch data');

  const json: StrapiResponse<StrapiPosts> = await res.json();

  const posts = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
  }));

  return { posts };
};

const Blog = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 10;

  const { posts } = loaderData;
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="mx-auto mt-10 max-w-3xl bg-gray-900 px-6 py-6">
      <h2 className="mb-8 text-3xl font-bold text-white">📑 Blogs</h2>
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />
      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-center text-gray-400">No posts found</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Blog;
