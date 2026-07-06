import { prisma } from "@/lib/prisma"
import type { IUser } from "../Auth/user.interface"
import type { IGear, IGearQuery } from "./gear.interface"

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

const getAllGearFromDb = async (query: IGearQuery) => {
    const { search, catagory, price, brand, page = "1", limit = "10" } = query

    const where: any = {}
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { brand: { contains: search, mode: 'insensitive' } }
        ]
    }
    if (catagory) {
        where.catagory = {
            name: { equals: catagory, mode: 'insensitive' }
        }
    }
    if (brand) {
        where.brand = { contains: brand, mode: 'insensitive' }
    }
    if (price) {
        where.rentalPrice = { lte: parseFloat(price) }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const take = parseInt(limit)

    const gear = await prisma.gearItem.findMany({
        where,
        skip,
        take,
        include: {
            catagory: {
                select: { id: true, name: true }
            },
            provider: {
                select: { id: true, name: true, email: true }
            }
        }
    })

    const total = await prisma.gearItem.count({ where })

    return {
        meta: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit))
        },
        data: gear
    }
}

const getGearByIdFronDb = async (gearId: string) => {

    const gear = await prisma.gearItem.findUnique({
        where: {
            id: gearId
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
            },
            reviews: {
                select: {
                    comment: true,
                    rating: true,
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            }
        }
    })

    if (!gear) {
        throw new Error("Gear not found")
    }

    return gear
}

export const gearService = {
    createGearInDb,
    getAllGearFromDb,
    getGearByIdFronDb
}