"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserContext } from "@/context/user.context";
import { useDeleteBlogMutation, useGetBlogsByUserEmailQuery } from "@/services/blog.service";
import { formatDistanceToNow } from "date-fns";
import { Edit2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { memo, useContext } from "react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const context = useContext(UserContext);

  const user = context.user

  const {
    isFetching,
    data: response,
  } = useGetBlogsByUserEmailQuery(user?.email || "", {
    skip: !user?.email,
  });

  const [deleteBlog] = useDeleteBlogMutation()

  if (!user) {
    return (
      <>
        <main className="min-h-screen bg-linear-to-b from-background to-blue-50/5 dark:to-blue-950/10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Please log in to access dashboard
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

  

  if (isFetching) return <div>Loading...</div>;

  // if(isError) return <div>Error...</div>

  const { data: blogs } = response || {};

  const handleDeleteBlog = async (_id: any) => {
    const toastId = toast.loading("Deleting...")

    const res = await deleteBlog(String(_id)).unwrap();

    if(res.success){
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
    toast.dismiss(toastId)
  };

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-background to-blue-50/5 dark:to-blue-950/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your blog posts and grow your audience
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Posts</p>
                  <p className="text-3xl font-bold mt-1">{blogs?.length ?? 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            {/* <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Read Count</p>
                  <p className="text-3xl font-bold mt-1">
                    {user.totalReadCount}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-900">
                  <div className="w-6 h-6 text-cyan-600 dark:text-cyan-400">
                    👁️
                  </div>
                </div>
              </div>
            </Card> */}

            <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Joined</p>
                  <p className="text-lg font-semibold mt-1">
                    {formatDistanceToNow(new Date(user.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                  <div className="w-6 h-6">🎉</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Posts Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Posts</h2>
              <Link href="/create">
                <Button className="bg-linear-to-r from-blue-600 to-cyan-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>

            {blogs && blogs?.length > 0 ? (
              <div className="space-y-4">
                {blogs.map((blog, i) => (
                 <BlogCard key={i} blog={blog} handleDeleteBlog={handleDeleteBlog} />
                ))}
              </div>
            ) : (
              <Card className="p-12 border-border/40 bg-card/50 backdrop-blur-sm text-center">
                <p className="text-muted-foreground text-lg mb-4">
                  You haven't published any posts yet
                </p>
                <Link href="/create">
                  <Button className="bg-linear-to-r from-blue-600 to-cyan-600">
                    Create Your First Post
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
}



const BlogCard = memo(({ blog, handleDeleteBlog }: { blog: any; handleDeleteBlog: (id: string) => void }) => (
  <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group animate-fade-in">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <Link href={`/blog/${btoa(String(blog._id))}`}>
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-blue-600 transition-colors cursor-pointer mb-2">
            {blog.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">
          Published{" "}
          {formatDistanceToNow(new Date(blog.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/edit/${btoa(String(blog._id))}`}>
          <Button variant="ghost" size="sm" className="hover:text-blue-600" title="Edit">
            <Edit2 className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeleteBlog(blog._id)}
          className="hover:text-destructive"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Card>
));

BlogCard.displayName = "BlogCard";
