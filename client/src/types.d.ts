//TODO: use json schema from db-vendor-client
type LocationResponse = {
  type: "station"
  id: string
  name: string
  latitude?: number
  longitude?: number
  products?: {
    nationalExpress?: boolean
    national?: boolean
    regionalExpress?: boolean
    regional?: boolean
    suburban?: boolean
    bus?: boolean
    ferry?: boolean
    subway?: boolean
    tram?: boolean
    taxi?: boolean
  }
  weight?: number
  poi?: boolean
  address?: {
    street?: string
    city?: string
    zip?: string
    country?: string
  }
}

type TrainConnectionResponse = {
  tripId: string
  line: {
    name: string
    product:
      | "nationalExpress"
      | "national"
      | "regionalExpress"
      | "regional"
      | "suburban"
      | "bus"
      | "ferry"
      | "subway"
      | "tram"
      | "taxi"
    mode: string
    symbol?: string
    nr?: number
    admin?: string
  }
  direction: string
  plannedWhen: string // ISO8601
  when: string // ISO8601
  delay?: number // Sekunden
  platform?: string
  plannedPlatform?: string
  provenance?: string
  stop: {
    type: "stop" | "station"
    id: string
    name: string
    location?: {
      latitude: number
      longitude: number
    }
  }
  remarks?: Array<{
    type: string
    code?: string
    text: string
  }>
  cancelled?: boolean
  additional?: boolean
}
