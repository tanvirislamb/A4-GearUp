import type { NextFunction, Request, Response } from "express"
import { errorResponse, response } from "@/Utils/res"
import httpStatus from "http-status"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "@/Config/envCongig"
import { prisma } from "@/lib/prisma"

const Middleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken

            if (!token) {
                throw new Error("No token provided")
            }

            const decoded = jwt.verify(token, config.access_secret as string) as JwtPayload

            const user = await prisma.user.findUnique({
                where: {
                    email: decoded.email
                }
            })
            if (!user) {
                return errorResponse(res, false, httpStatus.UNAUTHORIZED, "Unauthorized access")
            }
            req.user = user
            next()
        } catch (error: any) {
            response(res, false, error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to authenticate")
        }

    }
}

export default Middleware