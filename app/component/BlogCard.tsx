// app/component/BlogCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageProps {
  id: string;
  url: string;
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
  image: ImageProps;
}

export default function BlogCard({ title, excerpt, author, date, slug, image }: BlogCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      {image && (
        <div className="relative h-48">
          <Image
            src={image.url}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
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
        <div className="mt-4 flex gap-2">
          <Link href={`/update/${slug}`}>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Update
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}