import { prisma } from "@/lib/prisma"
import type { IReview } from "./review.interface"

export const insertReviewToDb = async (userId: string, payload: IReview) => {
    const { gearItemId, rating, comment } = payload

    const rental = await prisma.rentalOrder.findFirst({
        where: {
            customerId: userId,
            gearItemId: gearItemId
        }
    })
    if (!rental) {
        throw new Error("You have not rented this item")
    }

    const isReturned = rental.status === "RETURNED"

    if (!isReturned) {
        throw new Error("You must return the item before giving a review")
    }

    if (![1, 2, 3, 4, 5].includes(rating)) {
        throw new Error("Rating must be an integer between 1 and 5")
    }

    const review = await prisma.review.create({
        data: {
            customerId: userId,
            gearItemId: gearItemId,
            rating: rating,
            comment: comment
        }
    })

    return review
}

export const reviewService = {
    insertReviewToDb
}