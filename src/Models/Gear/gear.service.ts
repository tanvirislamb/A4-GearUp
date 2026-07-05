import { prisma } from "@/lib/prisma"
import type { IUser } from "../Auth/user.interface"
import type { IGear } from "./gear.interface"

const createGearInDb = async (payload: IGear, user: IUser) => {
    const role = user.role

    if (role !== "PROVIDER" as string) {
        throw new Error("You are not authorized to create gear")
    }

    const { name, description, brand, image, rentalPrice, stock, availableQty, categoryId } = payload
    const gear = await prisma.gearItem.create({
        data: {
            name,
            description,
            brand,
            image: image ?? null,
            rentalPrice,
            stock,
            availableQty,
            categoryId,
            providerId: user.id
        },
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

export const gearService = { createGearInDb }