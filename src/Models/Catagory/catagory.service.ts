import { prisma } from "@/lib/prisma"

export const getCatagoryFromDb = async () => {
    const catagory = await prisma.catagory.findMany()
    return catagory
}