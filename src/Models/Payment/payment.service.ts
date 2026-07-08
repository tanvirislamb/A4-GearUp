import { prisma } from "@/lib/prisma"
import Stripe from "stripe"
import type { IPaymentCreate } from "./payment.interface"
import config from "@/Config/envCongig"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const createPaymentInDb = async (customerId: string, customerEmail: string, payload: IPaymentCreate) => {
    const { rentalOrderId, method } = payload

    const rentalOrder = await prisma.rentalOrder.findUnique({
        where: {
            id: rentalOrderId
        }
    })

    if (!rentalOrder) {
        throw new Error("Rental order not found")
    }
    if (rentalOrder.customerId !== customerId) {
        throw new Error("You are not authorized to pay for this order")
    }

    const existingPayment = await prisma.payment.findUnique({
        where: {
            rentalOrderId
        }
    })

    if (existingPayment) {
        throw new Error("Payment already exists for this rental order")
    }
    if (rentalOrder.status !== "CONFIRMED") {
        throw new Error("Order must be confirmed before payment")
    }
    if (method !== "STRIPE") {
        throw new Error("Only Stripe payment method is supported currently")
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Rental Order #${rentalOrder.id}`
                    },
                    unit_amount: Math.round(rentalOrder.totalAmount * 100)
                },
                quantity: 1
            }
        ],
        customer_email: customerEmail,
        metadata: {
            rentalOrderId: rentalOrder.id,
            customerId: customerId
        },
        success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/payment/cancel`,
    })

    const payment = await prisma.payment.create({
        data: {
            customerId,
            rentalOrderId,
            transactionId: session.id,
            amount: rentalOrder.totalAmount,
            method: "STRIPE",
            status: "PENDING",
        }
    })

    return {
        payment,
        sessionId: session.id,
        sessionUrl: session.url,
    }
}

const confirmPaymentInDb = async (payload: Buffer, signature: string) => {
    const webhookSecret = config.stripe_webhook_secret as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (error: any) {
        throw new Error(`Webhook signature verification failed: ${error.message}`)
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session
        const rentalOrderId = session.metadata?.rentalOrderId

        if (!rentalOrderId) {
            throw new Error("Missing rentalOrderId in session metadata")
        }

        await prisma.payment.update({
            where: { rentalOrderId },
            data: {
                status: "COMPLETED",
                transactionId: session.payment_intent as string,
                paidAt: new Date(),
            }
        })

        await prisma.rentalOrder.update({
            where: {
                id: rentalOrderId
            },
            data: {
                status: "PAID"
            }
        })

        return { received: true, type: event.type }
    }

    if (event.type === "checkout.session.expired") {
        const session = event.data.object as Stripe.Checkout.Session
        const rentalOrderId = session.metadata?.rentalOrderId

        if (rentalOrderId) {
            await prisma.payment.update({
                where: { rentalOrderId },
                data: { status: "FAILED" }
            })
        }

        return { received: true, type: event.type }
    }

    return { received: true, type: event.type }
}

const getUserPaymentFromDb = async (customerId: string) => {
    const payments = await prisma.payment.findMany({
        where: {
            customerId
        },
        include: {
            rentalOrder: {
                include: {
                    gearItem: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return payments
}

const getPaymentDetailsFromDb = async (paymentId: string, customerId: string) => {
    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId
        },
        include: {
            rentalOrder: {
                include: {
                    gearItem: true
                }
            }
        }
    })

    if (!payment) {
        throw new Error("Payment not found")
    }

    if (payment.customerId !== customerId) {
        throw new Error("You are not authorized to view this payment")
    }

    return payment
}

export const paymentService = {
    createPaymentInDb,
    confirmPaymentInDb,
    getUserPaymentFromDb,
    getPaymentDetailsFromDb
}