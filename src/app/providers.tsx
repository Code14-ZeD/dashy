import { atom, Provider } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { initialDashboard } from "./categories"

export const jotaiDashboard = atomWithStorage<{
  categories: {
    name: string
    widgets: {
      id: string
      name: string
      content: string
      visible: boolean
    }[]
  }[]
}>("dashboard", initialDashboard)

export const jotaiSearch = atom("")
export const jotaiEditingCategory = atom({})

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}
