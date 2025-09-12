import { createClient } from "db-vendo-client"
import { profile as dbnavProfile } from "db-vendo-client/p/dbnav/index.js"
import { type NextFunction, type Request, type Response } from "express"
import type { TrainConnectionResponse } from "../models/train-connection-response.ts"

const userAgent = ""
const departureOptions = {
  when: new Date(),
  direction: null, // only supported in `dbweb` and with `enrichStations=true` (experimental)
  line: null, // not supported
  duration: 10, // show departures for the next n minutes
  results: null, // max. number of results; `null` means "whatever HAFAS wants"
  subStops: true, // not supported
  entrances: true, // not supported
  linesOfStops: false, // not supported
  remarks: true, // parse & expose hints & warnings?
  stopovers: false, // fetch & parse previous/next stopovers?, only supported with `dbweb` profile
  // departures at related stations
  // e.g. those that belong together on the metro map.
  includeRelatedStations: true,
  moreStops: null, // also include departures/arrivals for array of up to nine additional station evaNumbers (not supported with dbnav and dbweb)
  language: "de", // language to get results in
}
const client = createClient(dbnavProfile, userAgent)

// Read all connections
export const getTrainConnections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, duration } = req.params

    const opt = departureOptions
    opt.when = new Date()

    const dur = parseInt(duration ?? "", 10)
    if (!isNaN(dur) && dur > 0) {
      opt.duration = dur
    }

    const [arrivalsResponse, departuresResponse]: [
      { arrivals: TrainConnectionResponse[] },
      { departures: TrainConnectionResponse[] },
    ] = await Promise.all([client.arrivals(id, opt), client.departures(id, opt)])

    if (!arrivalsResponse && !departuresResponse) {
      return res.status(404).json({ message: "No arrivals or departures found" })
    }

    const filteredArrivals = arrivalsResponse.arrivals?.filter((a) => {
      return ["nationalExpress", "national", "regionalExpress", "regional"].includes(a.line.product)
    })
    const filteredDepartures = departuresResponse.departures?.filter((d) => {
      return ["nationalExpress", "national", "regionalExpress", "regional"].includes(d.line.product)
    })

    res.json({ departures: filteredDepartures, arrivals: filteredArrivals })
  } catch (error) {
    next(error)
  }
}
