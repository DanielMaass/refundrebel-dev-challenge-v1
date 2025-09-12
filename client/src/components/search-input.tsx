import { useQuery } from "@tanstack/react-query"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { getStations } from "../api/get-stations"
import { Button, type ButtonProps } from "../components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../components/ui/command"
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "../components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { useDataContext } from "../hooks/use-data-context"
import { useDebounced } from "../hooks/use-debounced"
import { useMediaQuery } from "../hooks/use-media-query"

export function SearchInput() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <SearchButton />
        </PopoverTrigger>
        <PopoverContent className="min-w-40 max-w-60 p-0" align="start">
          <StationList setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SearchButton />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Bahnhof auswählen</DrawerTitle>
        <DrawerDescription className="sr-only">Bitte wähle einen Bahnhof aus</DrawerDescription>
        <div className="mt-4 border-t">
          <StationList setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function SearchButton(props: ButtonProps) {
  const { selectedStation } = useDataContext()

  return (
    <Button variant="outline" {...props} className="min-w-40 max-w-60 justify-start grow">
      <span className="truncate">{selectedStation?.name ?? "Bahnhof suchen"}</span>
      <ChevronsUpDown className="ml-auto" />
    </Button>
  )
}

function StationList({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { setSelectedStation } = useDataContext()
  const [searchValue, setSearchValue] = useState("")
  const debouncedSearch = useDebounced(searchValue, 400)

  const { data, isLoading, error } = useQuery<LocationResponse[]>({
    queryKey: ["stations", debouncedSearch],
    queryFn: () => getStations(debouncedSearch),
    enabled: debouncedSearch.length > 2,
    staleTime: Infinity,
  })

  return (
    <Command>
      <CommandInput value={searchValue} onValueChange={setSearchValue} />
      <CommandList>
        <ResultList
          isLoading={isLoading}
          error={error}
          data={data}
          searchValue={searchValue}
          setOpen={setOpen}
          setSelectedStation={setSelectedStation}
        />
      </CommandList>
    </Command>
  )
}

function ResultList({
  isLoading,
  error,
  data,
  searchValue,
  setOpen,
  setSelectedStation,
}: {
  isLoading: boolean
  error: Error | null
  data?: LocationResponse[]
  searchValue: string
  setOpen: (open: boolean) => void
  setSelectedStation: (station: LocationResponse | null) => void
}) {
  if (isLoading) return <CommandItem>Hang on…</CommandItem>
  if (error) return <CommandItem>Something went wrong! {error.message}</CommandItem>
  if (!searchValue) return <CommandEmpty>Gebe mindestens 3 Zeichen ein</CommandEmpty>
  if (!data || !data.length) return <CommandEmpty>Keine Ergebnisse gefunden</CommandEmpty>

  return (
    <CommandGroup heading="Vorschläge">
      {data.map((station: LocationResponse) => {
        return (
          <CommandItem
            key={station.id}
            onSelect={() => {
              console.log("Selected props:", station)
              setSelectedStation(station)
              setOpen(false)
            }}
          >
            {station.name}
          </CommandItem>
        )
      })}
    </CommandGroup>
  )
}
