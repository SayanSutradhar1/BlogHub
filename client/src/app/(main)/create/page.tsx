"use client";

import type React from "react";
import PreviewModal from "@/components/Blog/PreviewModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/user.context";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useCreateBlogMutation } from "@/services/blog.service";
import toast from "react-hot-toast";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, _] = useState("");
  const router = useRouter();

  const context = useContext(UserContext);
  const user = context.user;

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [createBlog,response] = useCreateBlogMutation()



  if (!user) {
    return (
      <>
        <main className="min-h-screen bg-linear-to-b from-background to-blue-50/5 dark:to-blue-950/10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Please log in to create a blog
            </h1>
            <Link href="/login">
              <Button className="bg-linear-to-r from-blue-600 to-cyan-600">
                Go to Login
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(!title || !content){
      toast.error("Please fill all the fields")
      return
    }
    createBlog({
      content,
      images : [],
      title,
      userId : String(user._id),
    })

    const {isLoading,isError} = response

    if(isLoading){
      toast.loading("Uploading...")
    }

    if(isError){
      toast.error("Something went wrong")
      return
    }

    toast.success("Blog created successfully")
    setContent("")
    setTitle("")

    router.push("/dashboard")
  };

  const handleModalShow = (e:React.MouseEvent)=>{
    e.preventDefault()
    setIsOpenModal(true)
  }

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-background to-blue-50/5 dark:to-blue-950/10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="w-6 h-6 text-blue-600" />
              <h1 className="text-3xl font-bold">Create New Blog Post</h1>
            </div>

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

              <Button onClick={handleModalShow}>See the Preview</Button>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all duration-300 py-6"
                >
                  Publish Post
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

        <PreviewModal
          open={isOpenModal}
          onOpenChange={setIsOpenModal}
          title={title}
          image={image}
          content={content}
        />
      </main>
    </>
  );
}
