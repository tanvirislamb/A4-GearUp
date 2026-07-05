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

export const gearController = { createGear }