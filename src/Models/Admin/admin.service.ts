import { prisma } from "@/lib/prisma"
import type { IUser } from "../Auth/user.interface"
import type { UserStatus } from "@/generated/prisma/client"

const getAllUserFromDb = async () => {

    const users = await prisma.user.findMany({
        where: {
            role: {
                not: "ADMIN"
            }
        },
        omit: {
            password: true,
        }
    })
    return users
}

const patchUserInDb = async (userId: string, body: IUser) => {
    const { status } = body
    const update = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...(status && { status: status.toUpperCase() as UserStatus })
        },
        omit: {
            password: true
        }
    })

    if (!update) {
        throw new Error("User not found")
    }
    return update
}

const getAllGearFromDb = async () => {
    const gear = await prisma.gearItem.findMany({
        include: {
            catagory: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            },
            provider: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return gear
}

export const adminService = {
    getAllUserFromDb,
    patchUserInDb,
    getAllGearFromDb
}