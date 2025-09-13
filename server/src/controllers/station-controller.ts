//TODO: fix types with json schema from db-vendor-client
import { createClient } from "db-vendo-client"
import { profile as dbnavProfile } from "db-vendo-client/p/dbnav/index.js"
import { type NextFunction, type Request, type Response } from "express"
import { type LocationResponse } from "../models/location-response.ts"

const userAgent = ""
const dbVendoOptions = {
  fuzzy: true, // not supported
  results: 7, // how many search results?
  stops: true, // return stops/stations?
  addresses: true,
  poi: false, // points of interest
  subStops: true, // not supported
  entrances: true, // not supported
  linesOfStops: false, // not supported
  language: "de", // language to get results in
}
export const client = createClient(dbnavProfile, userAgent)

// Read all locations
export const getStations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params
    const result: LocationResponse[] = await client.locations(name, dbVendoOptions)
    const stations = result.filter(
      (loc) =>
        loc.type === "station" &&
        (loc.products?.national ||
          loc.products?.nationalExpress ||
          loc.products?.regional ||
          loc.products?.regionalExpress)
    )
    res.json(stations)
  } catch (error) {
    next(error)
  }
}
