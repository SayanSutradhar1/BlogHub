"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/user.context";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/services/blog.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Editor from "react-simple-wysiwyg";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EditPage({ params }: PageProps) {
  const slug = React.use(params).slug;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const context = useContext(UserContext);

  const user = context.user;

  const sameUser = useMemo(()=>user?.blogs.find((blogId) => atob(slug) === String(blogId)), [user, slug]);

  if (!sameUser) {
    redirect("/");
  }

  const {
    data: response,
    isLoading,
    isError,
  } = useGetBlogByIdQuery(atob(slug), {
    skip: !sameUser || !slug,
  });

  const blog = response?.data;

  useEffect(() => {
    setTitle(blog?.title || "");
    setContent(blog?.content || "");
  }, [response]);

  const [updateBlog] = useUpdateBlogMutation();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!title || !content) {
        toast.error("Please fill all the fields");
        return;
      }

      try {
        toast.loading("Updating...");

        const response = await updateBlog({
          _id: String(blog?._id),
          content,
          title,
        }).unwrap();

        toast.dismiss(); // close loading toast

        if (!response.success) {
          toast.error(response.message || "Something went wrong");
          return;
        }

        toast.success(response.message || "Blog updated successfully");
        router.push(`/blog/${slug}`);
      } catch (err: any) {
        toast.dismiss();
        toast.error(err?.data?.message || "Something went wrong");
      }
    },
    [title, content, blog?._id, slug, updateBlog, router]
  );

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!response?.success) {
    return <div>Page is unavailable</div>;
  }

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-background to-blue-50/5 dark:to-blue-950/10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to post
          </Link>

          <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-sm animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Blog Title
                </label>
                <Input
                  placeholder="Write an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg bg-input border-border/40 py-6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Blog Content
                </label>
                <Editor
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-4"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all duration-300 py-6"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="px-8"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}
