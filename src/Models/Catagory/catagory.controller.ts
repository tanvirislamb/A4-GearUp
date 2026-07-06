import { errorResponse, response } from "@/Utils/res"
import type { Request, Response } from "express"
import httpStatus from "http-status"
import { getCatagoryFromDb } from "./catagory.service"

export const getCatagory = async (req: Request, res: Response) => {
    try {
        const result = await getCatagoryFromDb()
        response(res, true, httpStatus.OK, "Catagories retrieved successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to retrieve catagory", error)
    }
}