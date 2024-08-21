import GlobalAddWidget from "@/components/globalAddWidget"
import Link from "next/link"

export default function Header() {
  return (
    <div className="sticky top-0 z-20 border-b bg-background">
      <nav className="container flex h-16 items-center justify-between gap-4 text-sm">
        <Link href={"/"} className="text-lg font-bold">
          ZED DASHY
        </Link>
        <GlobalAddWidget />
      </nav>
    </div>
  )
}
