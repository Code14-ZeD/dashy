import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categories } from "./categories"

export default function Home() {
  return (
    <main className="container p-8">
      {categories.map((category: { name: string; widgets: any }) => {
        return (
          <div key={category.name} className="mb-8 space-y-4">
            <h1 className="text-2xl font-bold text-primary">{category.name}</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {category.widgets.map((widget: { id: number; title: string }) => {
                return (
                  <Card key={category.name + widget.id}>
                    <CardHeader>
                      <CardTitle>{widget.title}</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}
    </main>
  )
}
