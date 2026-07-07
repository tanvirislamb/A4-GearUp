import { errorResponse, response } from "@/Utils/res"
import type { Request, Response } from "express"
import httpStatus from "http-status"
import type { IUser } from "../Auth/user.interface"
import { providerService } from "./provider.service"

const getOrders = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser
        const result = await providerService.getOrdersFromDb(user)
        response(res, true, httpStatus.OK, "Orders retrieved successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to get orders", error)
    }
}

export const providerController = {
    getOrders
}