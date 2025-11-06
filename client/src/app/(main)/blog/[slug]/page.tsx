import { getBlogById } from "@/actions/blog.action"
import { formatDistanceToNow } from "date-fns"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {

  const {slug} = await params

  const {data:blog,error} = await getBlogById(atob(slug))

  if(error){
    <div>Something went wrong</div>
  }
  

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-background to-blue-50/5 dark:to-blue-950/10">
        {/* Cover Image */}
        <div className="relative w-full h-96 md:h-[300px] overflow-hidden bg-linear-to-br from-blue-400 to-cyan-400">
          <img src={blog?.thumbnail || "/placeholder.png"} alt={blog?.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/80" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>

          <article className="animate-fade-in">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{blog?.title}</h1>

            {/* Meta */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pb-8 border-b border-border/40 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {blog?.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">{blog?.author.name}</p>
                  <p className="text-sm text-muted-foreground">Blogger</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{blog?.createdAt && formatDistanceToNow(new Date(blog?.createdAt), { addSuffix: true })}</span>
                </div>
              </div>

              {/* {isAuthor && (
                <div className="ml-auto flex gap-2">
                  <Link href={`/edit/${blog.slug}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Edit
                    </Button>
                  </Link>
                </div>
              )} */}
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none mb-12">
              <div className="text-lg leading-relaxed whitespace-pre-wrap text-black">
                <div dangerouslySetInnerHTML={{__html:blog?.content || ""}}/>
              </div>
            </div>

            {/* Author Bio Section */}
            <div className="bg-card/50 border border-border/40 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">About the author</h3>
              <p className="text-muted-foreground">
                {blog?.author.name} is a passionate writer sharing stories and insights on BlogHub.
              </p>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}

