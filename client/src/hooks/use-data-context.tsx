import { useContext } from "react"
import { DataContext } from "@/contexts/data-context"

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider")
  }
  return context
}
