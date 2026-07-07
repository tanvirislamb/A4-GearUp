import { prisma } from "@/lib/prisma"
import type { IUser } from "../Auth/user.interface"
import type { RentalStatus } from "@/generated/prisma/enums"

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

const updateStatusInDb = async (user: IUser, status: string, id: string) => {
    const role = user.role
    if (role !== "PROVIDER" as string) {
        throw new Error("Your are not authorized for this action")
    }

    const existingRental = await prisma.rentalOrder.findFirst({
        where: {
            id: id,
            gearItem: {
                providerId: user.id
            }
        }
    })

    if (!existingRental) {
        throw new Error("You can't update this")
    }

    const updateRental = await prisma.rentalOrder.update({
        where: {
            id: id
        },
        data: {
            ...(status && { status: status.toUpperCase() as RentalStatus })
        }
    })

    return updateRental

}

export const providerService = {
    getOrdersFromDb,
    updateStatusInDb
}