import type { Request, Response } from "express"
import { gearService } from "./gear.service"
import { errorResponse, response } from "@/Utils/res"
import httpStatus from "http-status"
import type { IUser } from "../Auth/user.interface"

const createGear = async (req: Request, res: Response) => {
    try {
        const result = await gearService.createGearInDb(req.body, req.user as IUser)
        response(res, true, httpStatus.CREATED, "Gear created successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to create gear", error)
    }
}

const getGear = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string
        const catagory = req.query.catagory as string
        const price = req.query.price as string
        const brand = req.query.brand as string
        const page = req.query.page as string
        const limit = req.query.limit as string

        const result = await gearService.getAllGearFromDb({ search, catagory, price, brand, page, limit })
        response(res, true, httpStatus.OK, "Gear retrieved successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to retrieve gear", error)
    }
}

export const gearController = {
    createGear,
    getGear
}