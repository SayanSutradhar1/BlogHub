import { Blog } from "@/lib/types";
import { BlogCard } from "./BlogCard";

const AllBlogs = ({
  blogs,
  searchQuery,
}: {
  blogs: Blog[];
  searchQuery: string;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.length > 0 ? (
          blogs
            .filter((blog) =>
              blog.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((blog) => (
              <div
                key={String(blog._id)}
                className="animate-fade-in"
                style={{
                  animationDelay: `${blogs.indexOf(blog) * 50}ms`,
                }}
              >
                <BlogCard post={blog} />
              </div>
            ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              {searchQuery
                ? "No blogs found matching your search"
                : "No blogs yet. Be the first to create one!"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
