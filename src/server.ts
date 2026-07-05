import app from "./app"
import config from "./Config/envCongig"

const port = config.port

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})