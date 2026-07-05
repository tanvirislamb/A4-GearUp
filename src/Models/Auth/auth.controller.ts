import type { Request, Response } from "express"
import { authService } from "./auth.service"
import { response } from "@/Utils/res"
import httpStatus from "http-status"

const registerUser = async (req: Request, res: Response) => {
    try {
        const { accessToken, refreshToken, user } = await authService.createUserInDb(req.body)

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

        response(res, true, httpStatus.CREATED, 'User registered successfully', user)
    } catch (error: any) {
        response(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || 'Failed to register user', error)
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { accessToken, refreshToken, user } = await authService.loginUserInDb(req.body)

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

        response(res, true, httpStatus.OK, 'User logged in successfully', user)
    } catch (error: any) {
        response(res, false, httpStatus.INTERNAL_SERVER_ERROR, error?.message || 'Failed to login user', error)
    }
}

export const authController = {
    registerUser,
    loginUser
}