import Middleware from "@/Middleware/authMiddleWare"
import { Router } from "express"
import { rentalController } from "./rental.controller"

const router = Router()

router.post('/', Middleware(), rentalController.placeOrder)
router.get('/', Middleware(), rentalController.getUserOrder)

export const rentalRouter = router