import Link from "next/link"
import { Github } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              T
            </div>
            <h1 className="text-2xl font-bold tracking-tight gradient-text">SortlyTask</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/MikeDevQH"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-400 transition-colors hover-scale px-3 py-2 rounded-md hover:bg-blue-500/10"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">MikeDevQH</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
