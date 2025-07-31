import express from "express"
import { getTheatresByCity } from "../controllers/theatreController.js"

const router = express.Router()

router.get("/", getTheatresByCity)

export default router
