import { prisma } from "@/lib/prisma"
import type { IUser } from "./user.interface"
import bcrypt from 'bcrypt'

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
            role
        }
    })

    return cretateUser

}

const loginUserInDb = async () => {

}

export const authService = {
    createUserInDb,
    loginUserInDb
}