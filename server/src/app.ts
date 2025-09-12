import express from "express"
import { errorHandler } from "./middlewares/error-handler.ts"
import itemRoutes from "./routes/item-routes.ts"
import { swaggerSpec, swaggerUi } from "./swagger.ts"

const app = express()

app.use(express.json())

// Routes
app.use(itemRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Global error handler (should be after routes)
app.use(errorHandler)

export default app
