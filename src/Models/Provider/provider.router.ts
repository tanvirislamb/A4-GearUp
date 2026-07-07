import { Router } from "express"
import { gearController } from "../Gear/gear.controller"
import Middleware from "@/Middleware/authMiddleWare"

const router = Router()

router.post('/gear', Middleware(), gearController.createGear)
router.put('/gear/:id', Middleware(), gearController.putGear)
router.delete('/gear/:id', Middleware(), gearController.deleteGear)

export const providerRouter = router