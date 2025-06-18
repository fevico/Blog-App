// // app/posts/[id]/edit/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { z } from 'zod';
// import { useRouter } from 'next/navigation';
// import { getPostBySlug, updatePost } from '@/lib/api';
// import Header from '@/app/component/Header';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';

// const postSchema = z.object({
//   title: z.string().optional(),
//   content: z.string().optional(),
//   author: z.string().optional(),
// });


// export default function UpdateBlogPost({ params }: { params: { slug: string } }) {
//   const [formData, setFormData] = useState({ title: '', content: '', author: '' });
//   const [image, setImage] = useState<File | null>(null);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [success, setSuccess] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const { slug } = params; 

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const post = await getPostBySlug(slug);
//         if (!post) {
//           setErrors({ form: 'Post not found.' });
//           return;
//         }
//         setFormData({
//           title: post.title,
//           content: post.content,
//           author: post.author,
//         });
//       } catch (error) {
//         setErrors({ form: 'Failed to load post.' });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [slug]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({});
//     setSuccess(null);
//   };

//   const handleOnSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = postSchema.safeParse(formData);

//     if (!result.success) {
//       const newErrors: { [key: string]: string } = {};
//       result.error.issues.forEach((issue) => {
//         newErrors[issue.path[0]] = issue.message;
//       });
//       setErrors(newErrors);
//       return;
//     }
//     try {
//       const data = new FormData();
//       if (formData.title) data.append('title', formData.title);
//       if (formData.content) data.append('content', formData.content);
//       if (formData.author) data.append('author', formData.author);
//       if (image) data.append('image', image);

//       updatePost(data, slug);
//       setSuccess('Post updated successfully!');
//       setImage(null);
//     }catch(error) {
//       setErrors({ form: 'Failed to update post. Please try again.' });
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//       setErrors({});
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = postSchema.safeParse(formData);

//     if (!result.success) {
//       const newErrors: { [key: string]: string } = {};
//       result.error.issues.forEach((issue) => {
//         newErrors[issue.path[0]] = issue.message;
//       });
//       setErrors(newErrors);  
//       return;
//     }

//     try {
//       const data = new FormData();
//       if (formData.title) data.append('title', formData.title);
//       if (formData.content) data.append('content', formData.content);
//       if (formData.author) data.append('author', formData.author);
//       if (image) data.append('image', image);

//       await updatePost(data, slug);
//       console.log(data, slug)
//       setSuccess('Post updated successfully!');
//       setImage(null);
//       setTimeout(() => {
//         router.push(`/update/${slug}`);
//       }, 1500);
//     } catch (error) {
//       setErrors({ form: 'Failed to update post. Please try again.' });
//     }
//   };

//   if (loading) {
//     return <p className="text-center py-8">Loading...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <main className="container mx-auto py-8">
//         <h2 className="text-3xl font-bold mb-6">Update Blog Post</h2>
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
//           {success && <p className="text-green-500 mb-4">{success}</p>}
//           {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}
//           <div className="mb-4">
//             <Label htmlFor="title">Title</Label>
//             <Input
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className={errors.title ? 'border-red-500' : ''}
//             />
//             {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//           </div>
//           <div className="mb-4">
//             <Label htmlFor="content">Content</Label>
//             <Textarea
//               id="content"
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               className={errors.content ? 'border-red-500' : ''}
//             />
//             {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
//           </div>
//           <div className="mb-4">
//             <Label htmlFor="author">Author</Label>
//             <Input
//               id="author"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               className={errors.author ? 'border-red-500' : ''}
//             />
//             {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
//           </div>
//           <div className="mb-4">
//             <Label htmlFor="image">Update Image (Optional)</Label>
//             <Input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>
//           <Button type="submit" onSubmit={handleOnSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
//             Update Post
//           </Button>
//         </form>
//       </main>
//     </div>
//   );
// }



// blog-frontend/app/posts/[slug]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { getPostBySlug, updatePost } from '@/lib/api';
import Header from '@/app/component/Header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { use } from 'react';

const postSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
});

export default function UpdateBlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // Unwrap params with React.use()
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostBySlug(slug);
        if (!post) {
          setErrors({ form: 'Post not found.' });
          return;
        }
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
        });
      } catch (error) {
        setErrors({ form: 'Failed to load post.' });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = postSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      const data = new FormData();
      if (formData.title) data.append('title', formData.title);
      if (formData.content) data.append('content', formData.content);
      if (formData.author) data.append('author', formData.author);
      if (image) data.append('image', image);

      const updatedPost = await updatePost(data, slug);
      setSuccess('Post updated successfully!');
      setImage(null);
      setTimeout(() => {
        router.push(`/post/${updatedPost.slug}`);
      }, 1500);
    } catch (error) {
      setErrors({ form: 'Failed to update post. Please try again.' });
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Update Blog Post</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? 'border-red-500' : ''}
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="image">Update Image (Optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? 'Updating...' : 'Update Post'}
          </Button>
        </form>
      </main>
    </div>
  );
}