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

const patchUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string

        const result = await adminService.patchUserInDb(userId, req.body)
        response(res, true, httpStatus.OK, "User updated successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to update user", error)
    }
}

const getAllGear = async (req: Request, res: Response) => {
    try {

        const result = await adminService.getAllGearFromDb()
        response(res, true, httpStatus.OK, "Gear retrieved successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to retrieve gear", error)
    }
}

const getAllRentals = async (req: Request, res: Response) => {
    try {
        const result = await adminService.getAllRentalsFromDb()
        response(res, true, httpStatus.OK, "Rentals retrieved successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to retrieve rentals", error)
    }
}

export const adminController = {
    getAllUser,
    patchUser,
    getAllGear,
    getAllRentals
}