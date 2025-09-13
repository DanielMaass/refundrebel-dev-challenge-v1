import { useQuery } from "@tanstack/react-query"
import { createContext, type ReactNode, useState } from "react"
import { getTrainConnections } from "@/api/get-train-connections"
import { useDebounced } from "@/hooks/use-debounced"

type DataContextType = {
  selectedStation: LocationResponse | null
  setSelectedStation: (station: LocationResponse | null) => void
  selectedDuration: number
  setSelectedDuration: (duration: number) => void
  data?: { arrivals: TrainConnectionResponse[]; departures: TrainConnectionResponse[] }
  isLoading: boolean
  error: Error | null
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStation, setSelectedStation] = useState<LocationResponse | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<number>(15)
  const debouncedStation = useDebounced(selectedStation, 700)

  const { data, isLoading, error } = useQuery<
    { arrivals: TrainConnectionResponse[]; departures: TrainConnectionResponse[] } | undefined
  >({
    queryKey: ["train-connections", debouncedStation?.id, selectedDuration],
    queryFn: () => getTrainConnections(debouncedStation!.id, selectedDuration),
    enabled: !!debouncedStation?.id,
    staleTime: 60 * 1000, // 1 minute
  })

  return (
    <DataContext.Provider
      value={{
        selectedStation,
        setSelectedStation,
        selectedDuration,
        setSelectedDuration,
        data,
        isLoading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
