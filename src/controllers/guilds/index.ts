import { Request, Response } from 'express'
import { User } from '../../database/schemas/User'
import { getBotGuildservice, getUserGuildsService } from '../../services/guilds'

export async function getGuildsController(req: Request, res: Response) {
	const user = req.user as User

	try {
		
    // fetching data
    const { data: botGuilds } = await getBotGuildservice()
		const { data: userGuilds } = await getUserGuildsService(user.id)
		
    // response
    res.send({
			botGuilds,
			userGuilds,
		})

	} catch (err) {
    console.log(err)
		res.status(400).send('Error')
	}
}
