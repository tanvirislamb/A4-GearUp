import { Router } from "express"
import { authController } from "./auth.controller"
import Middleware from "@/Middleware/authMiddleWare"


const router = Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/me', Middleware(), authController.getMe)

export const authRouter = router