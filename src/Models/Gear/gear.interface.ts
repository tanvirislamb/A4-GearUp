export interface IGear {
    name: string
    description: string
    brand: string
    image?: string | null
    rentalPrice: number
    stock: number
    availableQty: number
    providerId: string
    categoryId: string
}

export interface IGearQuery {
    search?: string
    catagory?: string
    price?: string
    brand?: string
    page?: string
    limit?: string
}