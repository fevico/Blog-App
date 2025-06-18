// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-server-tbwq.onrender.com',
  // baseURL: 'http://localhost:4000',
});
  
export interface ImageProps {
    id: string;
    url: string;
  }
  
  export interface Post {
    _id?: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: ImageProps;
    slug?: string;
  }
  
  export const getPosts = async (): Promise<Post[]> => {
    const response = await api.get('/blog/list');
    return response.data.map((post: any) => ({
      _id: post._id,
      title: post.title,
      content: post.content,
      excerpt: post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content,
      author: post.author,
      date: new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      image: post.image,
      slug: post.slug,
    }));
  };
  
  export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    try {
      const response = await api.get(`blog/${slug}`);
      const post = response.data;
      return {
        _id: post._id,
        title: post.title,
        content: post.content,
        excerpt: post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content,
        author: post.author,
        date: new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        image: post.image,
        slug: post._id,
      };
    } catch (error) {
      return null;
    }
  };
  
  // export const addPost = async (post: FormData): Promise<Post> => {
  //   const response = await api.post('/blog/create', post, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   const newPost = response.data;
  //   return {
  //     title: newPost.title,
  //     content: newPost.content,
  //     excerpt: newPost.content.length > 100 ? newPost.content.slice(0, 100) + '...' : newPost.content,
  //     author: newPost.author,
  //     date: new Date(newPost.createdAt).toLocaleDateString('en-US', {
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     }),
  //     image: newPost.image,
  //     slug: newPost._id,
  //   };
  // };

  export const addPost = async (post: FormData): Promise<Post> => {
    const response = await api.post('/blog/create', post, { 
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const newPost = response.data;
    return {
      _id: newPost._id,
      title: newPost.title,
      content: newPost.content,
      excerpt: newPost.content.length > 100 ? newPost.content.slice(0, 100) + '...' : newPost.content,
      author: newPost.author,
      date: new Date(newPost.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      image: newPost.image,
      slug: newPost.slug || newPost._id,
    };
  };

  export const updatePost = async (post: FormData, slug: string): Promise<Post> => {
    const response = await api.patch(`/blog/${slug}`, post, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const updatedPost = response.data;
    return {
      _id: updatedPost._id,
      title: updatedPost.title,
      content: updatedPost.content,
      excerpt: updatedPost.content.length > 100 ? updatedPost.content.slice(0, 100) + '...' : updatedPost.content,
      author: updatedPost.author,
      date: new Date(updatedPost.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      image: updatedPost.image,
    };
  };
