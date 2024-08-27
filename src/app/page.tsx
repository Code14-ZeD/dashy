"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useAtom } from "jotai"
import { EditIcon, XIcon } from "lucide-react"
import { jotaiDashboard, jotaiEditingCategory, jotaiSearch } from "./providers"

export default function Component() {
  const [dashboard, setDashboard] = useAtom(jotaiDashboard)
  const [searchTerm, setSearchTerm] = useAtom(jotaiSearch)
  const [editingCategory, setEditingCategory] = useAtom(jotaiEditingCategory)

  const removeWidget = (categoryName: string, widgetId: string) => {
    setDashboard((prevDashboard) => ({
      ...prevDashboard,
      categories: prevDashboard.categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId,
              ),
            }
          : category,
      ),
    }))
  }

  const toggleWidgetVisibility = (categoryName: string, widgetId: string) => {
    setDashboard((prevDashboard) => ({
      ...prevDashboard,
      categories: prevDashboard.categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              widgets: category.widgets.map((widget) =>
                widget.id === widgetId
                  ? { ...widget, visible: !widget.visible }
                  : widget,
              ),
            }
          : category,
      ),
    }))
  }

  const allWidgets = dashboard.categories.flatMap((category) =>
    category.widgets
      .filter((widget) => widget.visible)
      .map((widget) => ({ ...widget, category: category.name })),
  )

  const filteredWidgets = allWidgets.filter(
    (widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  return (
    <div className="container flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        {searchTerm ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWidgets.map((widget) => (
              <Card key={widget.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {widget.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeWidget(widget.category, widget.id)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{widget.content}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Category: {widget.category}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          dashboard.categories.map((category) => (
            <div key={category.name} className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCategory(category)}
                    >
                      <EditIcon className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit {category.name} Widgets</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      {category.widgets.map((widget) => (
                        <div
                          key={widget.id}
                          className="flex items-center justify-between py-2"
                        >
                          <span>{widget.name}</span>
                          <Switch
                            checked={widget.visible}
                            onCheckedChange={() =>
                              toggleWidgetVisibility(category.name, widget.id)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.widgets
                  .filter((widget) => widget.visible)
                  .map((widget) => (
                    <Card key={widget.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {widget.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeWidget(category.name, widget.id)
                            }
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{widget.content}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}
