import { errorResponse, response } from "@/Utils/res"
import type { Request, Response } from "express"
import httpStatus from "http-status"
import { rentalService } from "./rental.service"

const placeOrder = async (req: Request, res: Response) => {
    try {
        const customerId = req.user?.id as string

        const result = await rentalService.placeOrderInDb(customerId, req.body)
        response(res, true, httpStatus.OK, "Order placed successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to place order", error)
    }
}

const getUserOrder = async (req: Request, res: Response) => {
    try {
        const customerId = req.user?.id as string
        const result = await rentalService.getUserOrderFromDb(customerId)
        response(res, true, httpStatus.OK, "Got your orders", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to get orders", error)
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const userId = req.user?.id as string

        const result = await rentalService.getOrderByIdFromDb(id, userId)
        response(res, true, httpStatus.OK, "Retrive order successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to retrive order", error)
    }
}

export const rentalController = {
    placeOrder,
    getUserOrder,
    getOrderById
}