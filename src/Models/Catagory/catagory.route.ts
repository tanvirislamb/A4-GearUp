import { Router } from "express"
import { getCatagory } from "./catagory.controller"

const router = Router()

router.get('/', getCatagory)

export const catagoryRoutes = router