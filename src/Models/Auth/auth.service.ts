import { prisma } from "@/lib/prisma"
import type { IUser } from "./user.interface"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "@/Config/envCongig"

const createUserInDb = async (payload: IUser) => {
    const { email, password, name, role } = payload
    const encryptedPassword = await bcrypt.hash(password, 10)

    const userExsists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userExsists) {
        throw new Error("User already exists")
    }

    const cretateUser = await prisma.user.create({
        data: {
            email,
            password: encryptedPassword,
            name,
            role: role?.toUpperCase() as any
        },
        omit: {
            password: true
        }
    })

    const jwtPayload = {
        id: cretateUser.id,
        role: cretateUser.role,
        email: cretateUser.email,
        name: cretateUser.name
    }

    const accessToken = jwt.sign(jwtPayload, config.access_secret as string, { expiresIn: '1d' })
    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, { expiresIn: '7d' })

    return {
        accessToken,
        refreshToken,
        user: cretateUser
    }
}

const loginUserInDb = async () => {

}

export const authService = {
    createUserInDb,
    loginUserInDb
}