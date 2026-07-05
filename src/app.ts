import express, { json, type Application, type Request, type Response } from 'express'
import { authRouter } from './Models/Auth/auth.route'
const app: Application = express()

app.use(json())

app.use('/api/auth', authRouter)

app.get('/', async (req: Request, res: Response) => {
    res.send("Hello client side")
})

export default app