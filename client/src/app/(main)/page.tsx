import { getAllBlogs } from "@/actions/blog.action";
import SearchQuery from "@/components/Blog/SearchQuery";
import { Blog } from "@/lib/types";

export default async function HomePage() {
  const response = await getAllBlogs();

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-background via-background to-blue-50/5 dark:to-blue-950/10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              Discover Amazing Stories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore a world of creative writing, insights, and inspiration
              from writers around the globe
            </p>
          </div>

          {/* Blogs Grid */}
          <SearchQuery blogs={response.data as Blog[]}/>
        </section>
      </main>
    </>
  );
}
