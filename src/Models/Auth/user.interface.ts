export interface IUser {
    id: string
    email: string
    password: string
    name: string
    role?: "customer" | "provider"
    status?: "active" | "suspended"
}