import type { NextFunction, Request, Response } from "express"
import { errorResponse } from "@/Utils/res"
import httpStatus from "http-status"

export const adminMiddleWare = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user

            if (!user) {
                return errorResponse(res, false, httpStatus.UNAUTHORIZED, "Unauthorized")
            }

            if (user.role !== "ADMIN") {
                return errorResponse(res, false, httpStatus.FORBIDDEN, "Forbidden access")
            }

            next()
        } catch (error: any) {
            errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Internal server error")
        }
    }
}