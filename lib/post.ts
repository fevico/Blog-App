export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
  }
  
  export const getPosts = (): Post[] => {
    const posts: Post[] = [  
      {
        slug: 'first-post',
        title: 'My First Blog Post',
        excerpt: 'This is a short summary of my first blog post.',
        content: 'This is the full content of the first blog post. Lorem ipsum dolor sit amet...',
        author: 'John Doe',
        date: '2025-06-16',
      },
      {
        slug: 'second-post',
        title: 'Learning Next.js',
        excerpt: 'A brief overview of building with Next.js.',
        content: 'This post dives into Next.js features like App Router and SSR...',
        author: 'Jane Smith',
        date: '2025-06-15',
      },
    ];
  
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('posts');
      if (savedPosts) {
        try {
          const parsedPosts: Post[] = JSON.parse(savedPosts);
          // Validate parsed posts
          const validPosts = parsedPosts.filter((post): post is Post =>
            post &&
            typeof post.slug === 'string' &&
            typeof post.title === 'string' &&
            typeof post.excerpt === 'string' &&
            typeof post.content === 'string' &&
            typeof post.author === 'string' &&
            typeof post.date === 'string'
          );
          return [...posts, ...validPosts];
        } catch (error) {
          console.error('Error parsing localStorage posts:', error);
        }
      }
    }
    return posts;
  };
  
  export const getPostBySlug = (slug: string): Post | undefined => {
    return getPosts().find((post) => post.slug === slug);
  };
  
  export const addPost = (post: Omit<Post, 'slug' | 'date'>) => {
    const slug = post.title.toLowerCase().replace(/\s+/g, '-');
    const newPost: Post = {
      ...post,
      slug,
      date: new Date().toISOString().split('T')[0],
    };
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('posts');
      const posts = savedPosts ? JSON.parse(savedPosts) : [];
      posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  };