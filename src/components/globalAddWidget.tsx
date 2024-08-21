"use client"

import { jotaiCategories } from "@/app/providers"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const fixedCategories = ["espm", "pasm", "casm", "lasm"] as const

const formSchema = z.object({
  name: z.enum(fixedCategories),
  title: z.string().min(2).max(16),
})

export default function GlobalAddWidget() {
  const [categories, setCategories] = useAtom(jotaiCategories)
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "casm",
      title: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setCategories(
      categories.map((category) =>
        category.name === values.name
          ? {
              name: category.name,
              widgets: [
                ...category.widgets,
                { id: category.widgets.length, title: values.title },
              ],
            }
          : category,
      ),
    )
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Widgets +</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
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
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
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
