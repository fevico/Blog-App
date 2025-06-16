import Header from '@/app/component/Header';
import { getPostBySlug } from '@/lib/post';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params; // Await the params object
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <article className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-500 mb-4">
            <p>By {post.author}</p>
            <p>{post.date}</p>
          </div>
          <p className="text-gray-700">{post.content}</p>
        </article>
      </main>
    </div>
  );
}