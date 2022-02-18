import express, { Express } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import routes from '../routes'
require('../strategies/discord')

// --- SET UP THE APP
export function createApp(): Express {
	const app = express()

	// Enable parsing middleware for Requests
	app.use(express.json())
	app.use(express.urlencoded())

	// Using CORS
	app.use(
		cors({
			origin: ['http://localhost:3000'],
			credentials: true,
		})
	)

	// Using session cookies
	app.use(
		session({
			secret: 'LASKDJALSKDLKANSDQQLDHLJDNAS',
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7,
			},
		})
	)

	// Using passport
	app.use(passport.initialize())
	app.use(passport.session())

	app.use('/api', routes)

	return app
}
