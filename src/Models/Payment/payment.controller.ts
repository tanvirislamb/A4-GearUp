import { errorResponse, response } from "@/Utils/res"
import type { Request, Response } from "express"
import httpStatus from "http-status"
import { paymentService } from "./payment.service"

const createPayment = async (req: Request, res: Response) => {
    try {
        const customerId = req.user?.id as string
        const customerEmail = req.user?.email as string
        const result = await paymentService.createPaymentInDb(customerId, customerEmail, req.body)
        response(res, true, httpStatus.OK, "Payment intent created successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to create payment", error)
    }
}

const confirmPayment = async (req: Request, res: Response) => {
    try {
        const signature = req.headers["stripe-signature"] as string

        if (!signature) {
            return errorResponse(res, false, httpStatus.BAD_REQUEST, "Missing stripe-signature header")
        }

        const result = await paymentService.confirmPaymentInDb(req.body, signature)
        response(res, true, httpStatus.OK, "Webhook processed successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.BAD_REQUEST, error?.message || "Webhook processing failed", error)
    }
}

const getUserPayment = async (req: Request, res: Response) => {
    try {
        const customerId = req.user?.id as string
        const result = await paymentService.getUserPaymentFromDb(customerId)
        response(res, true, httpStatus.OK, "Payment history retrieved successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to get payment history", error)
    }
}

const getPaymentDetails = async (req: Request, res: Response) => {
    try {
        const paymentId = req.params.id as string
        const customerId = req.user?.id as string
        const result = await paymentService.getPaymentDetailsFromDb(paymentId, customerId)
        response(res, true, httpStatus.OK, "Payment details retrieved successfully", result)
    } catch (error: any) {
        errorResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || "Failed to get payment details", error)
    }
}

export const paymentController = {
    createPayment,
    confirmPayment,
    getUserPayment,
    getPaymentDetails
}