import { config } from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import routes from '../routes'
config()
require('../strategies/discord')

// --- SET UP THE APP
export function createApp(): Express {
	const app = express()

	// Enable Parsing Middleware for Requests
	app.use(express.json())
	app.use(express.urlencoded())

	// Enable CORS
	app.use(
		cors({
			origin: ['http://localhost:3001'],
			credentials: true,
		})
	)

	// Enable Sessions
	app.use(
		session({
			secret: 'LASKDJALSKDLKANSDQQLDHLJDNAS',
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 60000 * 60 * 24 * 7 },
		})
	)

	// Enable Passport
	app.use(passport.initialize())
	app.use(passport.session())

	app.use('/api', routes)

	return app
}
