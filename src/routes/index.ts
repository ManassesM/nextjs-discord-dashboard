import { Router } from 'express'
import authRouter from './auth'

const router = Router()

// ---- ROUTES

// -- GET
router.get('/auth', authRouter)

export default router
