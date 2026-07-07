import { prisma } from "@/lib/prisma"

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

export const adminService = {
    getAllUserFromDb
}