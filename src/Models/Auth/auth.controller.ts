import type { Request, Response } from "express"
import { authService } from "./auth.service"
import { response } from "@/Utils/res"

const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.createUserInDb(req.body)
        response(res, true,)
    } catch (error) {

    }
}

const loginUser = async (req: Request, res: Response) => {

}

export const authController = {
    registerUser,
    loginUser
}