import { describe, expect, it, vi } from "vitest"
import { client, getStations } from "../src/controllers/station-controller.ts"

const mockReq = { params: { name: "Berlin" } } as any
const mockRes = { json: vi.fn() } as any
const mockNext = vi.fn()

const result = [
  {
    id: "1",
    name: "Berlin",
    type: "station",
    products: { national: true },
  },
]

describe("station-controller", () => {
  it("should call res.json with result", async () => {
    vi.spyOn(client, "locations").mockResolvedValue(result)
    await getStations(mockReq, mockRes, mockNext)
    expect(mockRes.json).toHaveBeenCalledWith(result)
  })
})
