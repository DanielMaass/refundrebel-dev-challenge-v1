export interface TrainConnectionResponse {
  tripId: string
  line: {
    name: string
    product: string
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
