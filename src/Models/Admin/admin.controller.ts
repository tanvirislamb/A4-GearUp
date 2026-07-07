import { errorResponse, response } from "@/Utils/res"
import { adminService } from "./admin.service"
import httpStatus from "http-status"
import type { Request, Response } from "express"

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await adminService.getAllUserFromDb()
        response(res, true, httpStatus.OK, "User fetched successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to fetch user", error)
    }
}

export const adminController = {
    getAllUser
}