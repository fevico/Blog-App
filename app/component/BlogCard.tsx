// components/BlogCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, author, date, slug }: BlogCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>
          <Link href={`/post/${slug}`} className="text-blue-600 hover:underline">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{excerpt}</p>
        <div className="mt-4 text-sm text-gray-500">
          <p>By {author}</p>
          <p>{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}