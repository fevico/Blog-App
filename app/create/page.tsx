// blog-frontend/app/create/page.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { addPost } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { useRouter } from "next/navigation";
import Header from "../component/Header";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
});

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    setLoading(true); // Start loader

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("author", formData.author);
      if (image) {
        data.append("image", image);
      }

      const newPost = await addPost(data);
      setSuccess("Post created successfully!");
      setFormData({ title: "", content: "", author: "" });
      setImage(null);
      setLoading(false); // Stop loader
      setTimeout(() => {
        router.push(`/post/${newPost.slug}`); // Redirect to new post
      }, 1500); 
    } catch (error) {
      setLoading(false); // Stop loader
      setErrors({ form: "Failed to save post. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Create New Post</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow"
        >
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={errors.content ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="image">Post Image (Optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </main>
    </div>
  );
}
