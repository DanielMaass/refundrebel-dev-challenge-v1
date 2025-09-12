import { Router } from "express"
import { getTrainConnections } from "../controllers/train-connections-controller.ts"

const router = Router()

/**
 * @openapi
 * /train-connections/{id}/{duration}:
 *   get:
 *     summary: List of train connections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the train station
 *         schema:
 *           type: string
 *       - in: path
 *         name: duration
 *         required: false
 *         description: The duration for which to fetch train connections
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/train-connections/:id/:duration", getTrainConnections)

export default router
