
'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button"

 export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/create">Create Post</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}