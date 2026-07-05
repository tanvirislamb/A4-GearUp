import express, { json, type Application, type Request, type Response } from 'express'
import { authRouter } from './Models/Auth/auth.route'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(json())
app.use(cookieParser())
app.use('/api/auth', authRouter)

app.get('/', async (req: Request, res: Response) => {
    res.send("Hello client side")
})

export default app