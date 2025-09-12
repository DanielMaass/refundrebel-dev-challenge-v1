import "./App.css"
import { DurationSelect } from "./components/duration-select"
import { ResultTable } from "./components/result-table"
import { SearchInput } from "./components/search-input"
import { useDataContext } from "./hooks/use-data-context"

function App() {
  const { data, isLoading, error } = useDataContext()

  return (
    <div className="container mx-auto space-y-12 py-16 p-4">
      <div className="text-center">
        <p className="gradient-text text-3xl md:text-6xl">
          <span className="font-extrabold">Refund</span>
          <span className="font-light">Rebel</span>
        </p>
        <p className="text-sm">Dev Challenge V1</p>
      </div>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        <SearchInput />
        bis in
        <DurationSelect />
      </div>
      {isLoading && <p className="mx-auto text-center">Verbindungen suchen...</p>}
      {error && (
        <div className="mx-auto">
          <p>Upps... Beim Laden der Daten ist ein Fehler aufgetreten:</p>
          <p>{error.message}</p>
        </div>
      )}
      {data && (
        <>
          <ResultTable data={data?.arrivals} type="arrivals" />
          <ResultTable data={data?.departures} type="departures" />
        </>
      )}
    </div>
  )
}

export default App
