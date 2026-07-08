import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const config = {
    port: process.env.PORT,
    db_string: process.env.DB_STRING,
    access_secret: process.env.ACCESS_SECRET,
    refresh_secret: process.env.REFRESH_SECRET,
    stripe_secret: process.env.STRIPE_SECRET_KEY,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET
}

export default config