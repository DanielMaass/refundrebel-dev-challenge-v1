import cors from "cors"
import express from "express"
import { errorHandler } from "./middlewares/error-handler.ts"
import stationRoutes from "./routes/station-routes.ts"
import trainConnectionRoutes from "./routes/train-connection-routes.ts"
import { swaggerSpec, swaggerUi } from "./swagger.ts"

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use(stationRoutes)
app.use(trainConnectionRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Global error handler (should be after routes)
app.use(errorHandler)

export default app
