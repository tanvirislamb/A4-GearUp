import Middleware from "@/Middleware/authMiddleWare"
import { Router } from "express"
import { paymentController } from "./payment.controller"

const router = Router()

router.post('/create', Middleware(), paymentController.createPayment)

export const paymentRouter = router