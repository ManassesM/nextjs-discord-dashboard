import { Router } from 'express'
import passport from 'passport'
const router = Router()

// ---- ROUTES

// -- GET
router.get('/discord', passport.authenticate('discord'), (req, res) =>
	res.send(200)
)

router.get(
	'/discord/redirect',
	passport.authenticate('discord'),
	(req, res) => res.redirect('/discord/redirect')
)

router.get('/status', (req, res) => {
	return req.user
		? res.send(req.user)
		: res.status(401).send({ msg: 'Unauthorized' })
})

export default router
