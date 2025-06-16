// app/page.tsx
'use client';

import { getPosts } from '@/lib/post';
import { useState, useEffect } from 'react';
import Header from './component/Header';
import BlogCard from './component/BlogCard';

interface Post {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // Explicitly type as Post[]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePosts = () => {
      setPosts(getPosts());
      setLoading(false);
    };
    updatePosts();
    // Optional: Listen for storage changes (e.g., from other tabs)
    window.addEventListener('storage', updatePosts);
    return () => window.removeEventListener('storage', updatePosts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
        {loading ? (
          <p className="text-gray-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                slug={post.slug}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}