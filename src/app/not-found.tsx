import Link from "next/link"

export default function NotFound() {
  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center py-16">
      <h1>Error 404 😥</h1>
      <p>Oops! The page you are looking for cannot be found.</p>
      <Link className="underline" href="/">
        Go back home
      </Link>
    </main>
  )
}
