import { type NextFunction, type Request, type Response } from "express"
import { items, type Item } from "../models/item.ts"

// Create an item
export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("### POST CALLED ###")
    const { name } = req.body
    const newItem: Item = { id: Date.now(), name }
    items.push(newItem)
    res.status(201).json(newItem)
  } catch (error) {
    next(error)
  }
}

// Read all items
export const getItems = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(items)
  } catch (error) {
    next(error)
  }
}

// Read single item
export const getItemById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id ?? "", 10)
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid item ID" })
      return
    }
    const item = items.find((i) => i.id === id)
    if (!item) {
      res.status(404).json({ message: "Item not found" })
      return
    }
    res.json(item)
  } catch (error) {
    next(error)
  }
}

// Update an item
export const updateItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id ?? "", 10)
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid item ID" })
      return
    }

    const { name } = req.body
    const itemIndex = items.findIndex((i) => i.id === id)
    if (itemIndex === -1) {
      res.status(404).json({ message: "Item not found" })
      return
    }

    if (items[itemIndex]) {
      items[itemIndex].name = name
    }

    res.json(items[itemIndex])
  } catch (error) {
    next(error)
  }
}

// Delete an item
export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id ?? "", 10)
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid item ID" })
      return
    }
    const itemIndex = items.findIndex((i) => i.id === id)
    if (itemIndex === -1) {
      res.status(404).json({ message: "Item not found" })
      return
    }
    const deletedItem = items.splice(itemIndex, 1)[0]
    res.json(deletedItem)
  } catch (error) {
    next(error)
  }
}
