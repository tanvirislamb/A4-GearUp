import { adminMiddleWare } from "@/Middleware/adminMiddleWare"
import Middleware from "@/Middleware/authMiddleWare"
import { Router } from "express"
import { adminController } from "./admin.controller"

const router = Router()

router.get('/users', Middleware(), adminMiddleWare(), adminController.getAllUser)

export const adminRouter = router