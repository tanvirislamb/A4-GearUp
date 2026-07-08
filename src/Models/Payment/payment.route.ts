import Middleware from "@/Middleware/authMiddleWare"
import { Router } from "express"
import { paymentController } from "./payment.controller"

const router = Router()

router.post('/create', Middleware(), paymentController.createPayment)
router.get('/', Middleware(), paymentController.getUserPayment)
router.get('/:id', Middleware(), paymentController.getPaymentDetails)

export const paymentRouter = router