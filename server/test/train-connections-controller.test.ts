import { describe, expect, it, vi } from "vitest"
import { getTrainConnections } from "../src/controllers/train-connections-controller.ts"
import { client } from "../src/controllers/train-connections-controller.ts"

const mockReq = { params: { id: "123", duration: "10" } } as any
const mockRes = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any
const mockNext = vi.fn()

describe("train-connections-controller", () => {
  it("should return filtered arrivals and departures", async () => {
    const arrivals = [
      { line: { product: "national" } },
      { line: { product: "bus" } },
    ]
    const departures = [
      { line: { product: "regionalExpress" } },
      { line: { product: "tram" } },
    ]
    vi.spyOn(client, "arrivals").mockResolvedValue({ arrivals })
    vi.spyOn(client, "departures").mockResolvedValue({ departures })

    await getTrainConnections(mockReq, mockRes, mockNext)
    expect(mockRes.json).toHaveBeenCalledWith({
      arrivals: [arrivals[0]],
      departures: [departures[0]],
    })
  })

  it("should return 404 if no arrivals or departures", async () => {
    vi.spyOn(client, "arrivals").mockResolvedValue(undefined as any)
    vi.spyOn(client, "departures").mockResolvedValue(undefined as any)

    await getTrainConnections(mockReq, mockRes, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({ message: "No arrivals or departures found" })
  })
})
