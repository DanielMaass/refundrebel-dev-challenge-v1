import { useMediaQuery } from "../hooks/use-media-query"
import { cn } from "../lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export function ResultTable({ data, type }: { data?: TrainConnectionResponse[]; type: "arrivals" | "departures" }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!data || data.length === 0) return null

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold">{type === "arrivals" ? "Ankünfte" : "Abfahrten"}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Zugnummer</TableHead>
            <TableHead className="min-w-0 whitespace-nowrap w-[1%] truncate">
              {type === "arrivals" ? "von" : "nach"}
            </TableHead>
            <TableHead className="text-right">Gleis</TableHead>
            <TableHead>geplant</TableHead>
            {isDesktop && <TableHead className="">{type === "arrivals" ? "Ankunft" : "Abfahrt"}</TableHead>}
            <TableHead>verspätet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((connection) => (
            <TableRow key={connection.tripId}>
              <TableCell className="font-medium">{connection.line.name}</TableCell>
              <TableCell className="font-medium min-w-0 w-[1%] whitespace-nowrap truncate">
                {type === "arrivals" ? connection.provenance : connection.direction}
              </TableCell>
              <TableCell className="text-right">{connection.plannedPlatform}</TableCell>
              <TableCell>
                {new Date(connection.plannedWhen).toLocaleTimeString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                Uhr
              </TableCell>
              {isDesktop && (
                <TableCell>
                  {new Date(connection.when).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  Uhr
                </TableCell>
              )}
              <TableCell
                className={cn(
                  (connection?.delay ?? 0) > 5 * 60 && "text-red-500",
                  !(connection?.delay ?? 0) && "text-green-600"
                )}
              >
                {connection.delay ? `${connection.delay / 60} min` : "pünktlich"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
