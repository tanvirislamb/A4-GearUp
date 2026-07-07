import { prisma } from "@/lib/prisma"
import type { IRental } from "./rental.interface"

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

export const rentalService = {
    placeOrderInDb,
    getUserOrderFromDb
}