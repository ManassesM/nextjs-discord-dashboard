import { Router } from 'express'
import passport from 'passport'

const router = Router()


// ---- GET

// -- AUTHENTICATE USER
router.get('/discord', passport.authenticate('discord'), (req, res) =>
	res.send(200)
)

// -- AUTHENTICATE WITH DISCORD
router.get('/discord/redirect', passport.authenticate('discord'), (req, res) =>
	res.send({ msg: 'Success' })
)

// -- CHECK AUTHENTICATION STATUS
router.get('/status', (req, res) => {
	return req.user
		? res.send(req.user)
		: res.status(401).send({ msg: 'Unauthorized' })
})

export default router
