export interface IUser {
    email: string
    password: string
    name: string
    role?: "customer" | "provider"
    status?: "active" | "suspended"
}