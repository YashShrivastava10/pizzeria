import express from "express"
import { addToCart, cartCount, cartDetails, getIngredientDetails, getPizzaDetails } from "../controllers/client.js"
import { authMiddleware } from "../middleware/authMiddleware.js"


const router = express.Router()

router.get("/pizza", getPizzaDetails)
router.get("/ingredients", getIngredientDetails)
router.post("/addToCart", authMiddleware, addToCart)
router.get("/cartCount", authMiddleware, cartCount)
router.get("/cart", authMiddleware, cartDetails)

export default router