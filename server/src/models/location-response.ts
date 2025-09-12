export interface LocationResponse {
  type: "location" | "stop" | "station" | "address" | "poi"
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
