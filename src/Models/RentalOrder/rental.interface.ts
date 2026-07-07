export interface IRental {
    id: string
    customerId: string
    gearItemId: string
    quantity: number
    status: "PLACED" | "CONFIRMED" | "PAID" | "RETURNED" | "CANCELLED" | " PICKED_UP"
    startDate: Date
    endDate: Date
    totalAmount: number
}