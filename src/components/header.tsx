"use client"

import { jotaiSearch } from "@/app/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { atom, useAtom } from "jotai"
import { LayoutDashboardIcon, MenuIcon, SearchIcon } from "lucide-react"
import GlobalAddWidget from "./globalAddWidget"

const isMobileMenuOpenAtom = atom(false)

export default function Header() {
  const [searchTerm, setSearchTerm] = useAtom(jotaiSearch)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(isMobileMenuOpenAtom)

  return (
    <div className="sticky top-0 z-20 border-b bg-background">
      <nav className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <LayoutDashboardIcon className="mr-2 h-8 w-8" />
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search widgets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10"
                  />
                </div>
                <GlobalAddWidget />
              </div>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="flex px-2 pb-3 pt-2 sm:px-3">
              <div className="relative ml-2">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search widgets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
              <div className="w-max">
                <GlobalAddWidget />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
