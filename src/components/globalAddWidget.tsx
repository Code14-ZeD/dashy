"use client"

import { jotaiDashboard } from "@/app/providers"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const fixedCategories = [
  "CSPM Executive Dashboard",
  "Security Overview",
  "CWPP Dashboard",
] as const

const formSchema = z.object({
  name: z.string().min(2),
  category: z.enum(fixedCategories),
  content: z.string().min(2),
})

export default function GlobalAddWidget() {
  const [dashboard, setDashboard] = useAtom(jotaiDashboard)
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
      category: "CSPM Executive Dashboard",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.name && values.content && values.category) {
      const newWidget = {
        id: Date.now().toString(),
        name: values.name,
        content: values.content,
        visible: true,
      }
      setDashboard((prevDashboard) => ({
        ...prevDashboard,
        categories: prevDashboard.categories.map((category) =>
          category.name === values.category
            ? { ...category, widgets: [...category.widgets, newWidget] }
            : category,
        ),
      }))
    }

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="ml-4">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Widget
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Widget</SheetTitle>
          <SheetDescription>
            Select a category and add name and content
          </SheetDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input placeholder="content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fixedCategories.map((category) => {
                          return (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
