import { prisma } from "@/lib/prisma"
import type { IRental } from "./rental.interface"
import type { IUser } from "../Auth/user.interface"

const placeOrderInDb = async (customerId: string, payload: IRental) => {
    const { gearItemId, quantity, startDate, endDate, } = payload
    const item = await prisma.gearItem.findUnique({
        where: {
            id: gearItemId
        }
    })
    if (!item) {
        throw new Error("Item not found")
    }
    if (item?.availableQty as number < quantity) {
        throw new Error("Not enough stock")
    }

    const totalPrice = item.rentalPrice * quantity

    const order = await prisma.rentalOrder.create({
        data: {
            customerId,
            gearItemId,
            quantity,
            startDate,
            endDate,
            totalAmount: totalPrice,
        }
    })
    await prisma.gearItem.update({
        where: {
            id: gearItemId
        },
        data: {
            availableQty: (item.availableQty as number) - quantity
        }
    })
    return order

}

const getUserOrderFromDb = async (customerId: string) => {
    const orders = await prisma.rentalOrder.findMany({
        where: {
            customerId: customerId
        },
        include: {
            gearItem: true
        }

    })
    return orders
}

const getOrderByIdFromDb = async (orderId: string, userId: string) => {

    const order = await prisma.rentalOrder.findUnique({
        where: {
            id: orderId
        },
        include: {
            gearItem: {
                include: {
                    catagory: {
                        select: {
                            name: true,
                            description: true
                        }
                    },
                    provider: {
                        omit: {
                            password: true
                        }
                    }
                }
            }
        }
    })
    if (order?.customerId !== userId) {
        throw new Error("You can't access this order!")
    }
    return order
}

export const rentalService = {
    placeOrderInDb,
    getUserOrderFromDb,
    getOrderByIdFromDb
}