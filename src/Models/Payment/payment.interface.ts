export interface IPaymentCreate {
    rentalOrderId: string
    method: "STRIPE" | "SSLCOMMERZ"
}

export interface IPayment {
    id: string
    customerId: string
    rentalOrderId: string
    transactionId: string | null
    amount: number
    method: "STRIPE" | "SSLCOMMERZ"
    status: "PENDING" | "COMPLETED" | "FAILED"
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
}
