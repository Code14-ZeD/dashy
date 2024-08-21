import { Provider } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { demoCategories } from "./categories"

export const jotaiCategories = atomWithStorage<
  { name: string; widgets: any }[]
>("categories", demoCategories)

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}
