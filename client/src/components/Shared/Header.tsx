import { Button } from "@/components/ui/button"
import { Feather } from "lucide-react"
import Link from "next/link"
import LogOutButton from "./LogOutButton"

export function Header({isLoggedIn}:{isLoggedIn:boolean}) {

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-md bg-background/80 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 text-white group-hover:shadow-lg transition-all duration-300">
              <Feather className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              BlogHub
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
              Explore
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/create">
                  <Button className="bg-linear-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all duration-300">
                    New Post
                  </Button>
                </Link>
                <LogOutButton/>
                {/* <div className="text-sm text-muted-foreground">{user.name}</div> */}
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-linear-to-r from-blue-600 to-cyan-600">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
