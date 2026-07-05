import { Router } from "express"
import { gearController } from "../Gear/gear.controller"
import Middleware from "@/Middleware/authMiddleWare"

const router = Router()

router.post('/gear', Middleware(), gearController.createGear)

export const providerRouter = router