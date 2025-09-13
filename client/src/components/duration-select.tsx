import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDataContext } from "@/hooks/use-data-context"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ChevronsUpDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"

export function DurationSelect() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <DurationButton />
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <DurationList setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <DurationButton />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Dauer auswählen</DrawerTitle>
        <DrawerDescription className="sr-only">Bitte wähle eine Dauer aus</DrawerDescription>
        <div className="mt-4 border-t">
          <DurationList setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function DurationButton(props: ButtonProps) {
  const { selectedDuration } = useDataContext()
  return (
    <Button variant="outline" {...props} className="grow">
      {selectedDuration} Minuten
      <ChevronsUpDown className="ml-auto" />
    </Button>
  )
}

function DurationList({ setOpen }: { setOpen: (open: boolean) => void }) {
  const commandRef = useRef<HTMLDivElement>(null)
  const { setSelectedDuration } = useDataContext()
  const durations = [15, 30, 45, 60, 90, 120]

  useEffect(() => {
    commandRef.current?.focus()
  }, [])

  return (
    <Command ref={commandRef} loop>
      <CommandList>
        <CommandGroup heading="in den nächsten">
          {durations.map((duration) => {
            return (
              <CommandItem
                key={duration}
                onSelect={() => {
                  setSelectedDuration(duration)
                  setOpen(false)
                }}
              >
                {duration} Minuten
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
