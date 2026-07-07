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

const updateStatus = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser
        const id = req.params.id as string
        const status = req.body.status as string

        const result = await providerService.updateStatusInDb(user, status, id)
        response(res, true, httpStatus.OK, "Updated successfully", result)

    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to update status", error)
    }
}

export const providerController = {
    getOrders,
    updateStatus
}