import { Router } from "express"
import { getStations } from "../controllers/station-controller.ts"

const router = Router()

/**
 * @openapi
 * /stations/{name}:
 *   get:
 *     summary: List of stations
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the station
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/stations/:name", getStations)

export default router
