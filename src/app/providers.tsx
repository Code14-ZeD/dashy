import { Provider } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const jotaiCategories = atomWithStorage<
  { name: string; widgets: any }[]
>("categories", [])

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}
