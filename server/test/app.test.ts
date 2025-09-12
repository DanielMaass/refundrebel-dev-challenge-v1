import request from "supertest"
import { describe, expect, it } from "vitest"
import app from "../src/app.ts"

describe("Server API", () => {
  it("should return 200 for GET /", async () => {
    const res = await request(app).get("/")
    expect(res.status).toBe(200)
  })
})
