import express, { json, type Application, type Request, type Response } from 'express'
import { authRouter } from './Models/Auth/auth.route'
import cookieParser from 'cookie-parser'
import { providerRouter } from './Models/Provider/provider.router'
import { gearRoutes } from './Models/Gear/gear.route'
import { catagoryRoutes } from './Models/Catagory/catagory.route'
import { adminRouter } from './Models/Admin/admin.route'
import { rentalRouter } from './Models/RentalOrder/rental.route'
import { reviewRouter } from './Models/Reviews/review.route'

const app: Application = express()

app.use(json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/gear', gearRoutes)
app.use('/api/categories', catagoryRoutes)
app.use('/api/rentals', rentalRouter)
app.use('/api/provider', providerRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/admin', adminRouter)

app.get('/', async (req: Request, res: Response) => {
    res.send("Hello client side")
})

export default app