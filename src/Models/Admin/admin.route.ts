import { adminMiddleWare } from "@/Middleware/adminMiddleWare"
import Middleware from "@/Middleware/authMiddleWare"
import { Router } from "express"
import { adminController } from "./admin.controller"

const router = Router()

router.get('/users', Middleware(), adminMiddleWare(), adminController.getAllUser)
router.patch('/users/:id', Middleware(), adminMiddleWare(), adminController.patchUser)
router.get('/gear', Middleware(), adminMiddleWare(), adminController.getAllGear)
router.get('/rentals', Middleware(), adminMiddleWare(), adminController.getAllRentals)

export const adminRouter = router