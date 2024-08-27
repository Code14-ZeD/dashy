import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { JotaiProvider } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage widgets on dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-backgound min-h-dvh font-sans antialiased">
        <JotaiProvider>
          <Header />
          {children}
          <Footer />
        </JotaiProvider>
      </body>
    </html>
  )
}
