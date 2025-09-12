import { Router } from "express"
import { createItem, deleteItem, getItemById, getItems, updateItem } from "../controllers/item-controller.ts"

const router = Router()

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Liste aller Items
 *     responses:
 *       200:
 *         description: Erfolgreich
 */
router.get("/items", getItems)
/**
 * @openapi
 * /items/{id}:
 *   get:
 *     summary: Details eines Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Die ID des Items
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Erfolgreich
 */
router.get("/items/:id", getItemById)
/**
 * @openapi
 * /items:
 *   post:
 *     summary: Erstelle ein neues Item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item erstellt
 */
router.post("/items", createItem)
/**
 * @openapi
 * /items/{id}:
 *   put:
 *     summary: Aktualisiere ein Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Die ID des Items
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item aktualisiert
 */
router.put("/items/:id", updateItem)
/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     summary: Lösche ein Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Die ID des Items
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item gelöscht
 */
router.delete("/items/:id", deleteItem)

export default router
