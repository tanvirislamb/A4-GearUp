export interface IReview {
    id: string
    gearItemId: string
    customerId: string
    rating: 1 | 2 | 3 | 4 | 5
    comment: string
    createdAt: Date
}