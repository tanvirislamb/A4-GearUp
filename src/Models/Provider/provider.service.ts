import { prisma } from "@/lib/prisma"
import type { IUser } from "../Auth/user.interface"

const getOrdersFromDb = async (user: IUser) => {
    const role = user.role
    if (role !== "PROVIDER" as string) {
        throw new Error("You are not authorized to access this resource")
    }
    const orders = await prisma.rentalOrder.findMany({
        where: {
            gearItem: {
                providerId: user.id
            }
        },
        include: {
            customer: {
                select: {
                    name: true,
                    email: true
                }
            },
            gearItem: {
                select: {
                    name: true,
                    brand: true,
                    rentalPrice: true,
                    image: true
                }
            }
        }
    })

    if (!orders) {
        throw new Error("No orders found")
    }

    return orders
}

export const providerService = {
    getOrdersFromDb
}