// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/api';
import Header from './component/Header';
import BlogCard from './component/BlogCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        console.log(data); // Debug: Check mapped data
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p className="text-gray-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post._id} // Use _id as unique key
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                slug={post.slug ? post.slug : "string"} // Fallback to _id
                image={post.image}
              />
            ))}
          </div>  
        )}
      </main>
    </div>
  );
}