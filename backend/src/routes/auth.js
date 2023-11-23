import express from "express"
import { login, resetPassword, signUp} from "../controllers/auth.js"

const router = express.Router()

router.post("/login", login)
router.post("/signUp", signUp)
router.post("/resetPassword", resetPassword)

export default router