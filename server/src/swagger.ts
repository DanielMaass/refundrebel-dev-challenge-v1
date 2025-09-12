import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RefundRebel API Dev Challenge V1",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"], // Pfad zu deinen Route-Dateien
}

export const swaggerSpec = swaggerJSDoc(options)
export { swaggerUi }
