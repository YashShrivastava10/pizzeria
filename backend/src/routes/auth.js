import express from "express"
import { googleLogin, login, resetPassword, signUp} from "../controllers/auth.js"

const router = express.Router()

router.post("/login", login)
router.post("/signUp", signUp)
router.post("/resetPassword", resetPassword)
router.post("/googleLogin", googleLogin)

export default router