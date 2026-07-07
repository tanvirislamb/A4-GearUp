import { Router } from "express"
import { gearController } from "../Gear/gear.controller"
import Middleware from "@/Middleware/authMiddleWare"
import { providerController } from "./provider.controller"

const router = Router()

router.post('/gear', Middleware(), gearController.createGear)
router.put('/gear/:id', Middleware(), gearController.putGear)
router.delete('/gear/:id', Middleware(), gearController.deleteGear)
router.get('/orders', Middleware(), providerController.getOrders)
router.patch('/orders/:id', Middleware(), providerController.updateStatus)

export const providerRouter = router