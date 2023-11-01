import express from "express"
import { getIngredientDetails, getPizzaDetails } from "../controllers/client.js"


const router = express.Router()

router.get("/pizza", getPizzaDetails)
router.get("/ingredients", getIngredientDetails)

export default router