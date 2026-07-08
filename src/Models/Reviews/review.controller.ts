import { errorResponse, response } from "@/Utils/res"
import type { Request, Response } from "express"
import httpStatus from "http-status"
import { reviewService } from "./review.service"
import type { IReview } from "./review.interface"

const insertReview = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string
        const result = await reviewService.insertReviewToDb(userId, req.body as IReview)
        response(res, true, httpStatus.OK, "Added review successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed add reviews", error)
    }
}

export const reviewController = {
    insertReview
}

