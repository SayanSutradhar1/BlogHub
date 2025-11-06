import { Card } from "@/components/ui/card"
import { Blog } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"

interface BlogProps {
  post: Blog
}

export function BlogCard({ post }: BlogProps) {
  return (
    <Link href={`/blog/${btoa(String(post._id))}`}>
      <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-400 to-cyan-400">
          <img
            src={post.thumbnail || "/placeholder.png?height=192&width=400&query=blog+cover"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
            {post.title}
          </h3>

          {/* <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p> */}

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="w-3 h-3" />
                {post.author.name}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
