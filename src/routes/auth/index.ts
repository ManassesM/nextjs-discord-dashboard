import { Router } from 'express'
const router = Router()

// ---- ROUTES

// -- GET
router.get('/', (req, res) => {
	res.send(200)
})

export default router
