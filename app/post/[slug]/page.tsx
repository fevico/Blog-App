// app/posts/[slug]/page.tsx
import { getPostBySlug } from '../../../lib/api';
import { notFound } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/component/Header';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  console.log(slug)
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">Back to Home</Link>
        </Button>
        <article className="bg-white p-6 rounded-lg shadow">
          {post.image && (
            <div className="relative h-96 mb-4">
              <Image
                src={post.image.url}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                sizes="100vw"
              />
            </div>
          )}
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