import { Request, Response } from 'express'
import { User } from '../../database/schemas/User'
import {
	getBotGuildservice,
	getMutualGuildsService,
	getUserGuildsService,
} from '../../services/guilds'

export async function getGuildsController(req: Request, res: Response) {
	const user = req.user as User

	try {
		
    // fetching data
		const guilds = await getMutualGuildsService(user.id)

		// response
		res.send({ guilds })

	} catch (err) {
		console.log(err)
		res.status(400).send('Error')
	}
}
