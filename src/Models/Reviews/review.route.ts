import Middleware from "@/Middleware/authMiddleWare"
import { Router } from "express"
import { reviewController } from "./review.controller"

const router = Router()

router.post('/', Middleware(), reviewController.insertReview)

export const reviewRouter = router