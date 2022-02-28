import { Request, Response } from 'express'
import { getBotGuildservice } from '../../services/guilds'

export async function getGuildsController(req: Request, res: Response) {
	try {
		
    const { data } = await getBotGuildservice()
		res.send(data)

	} catch (err) {
		res.status(400).send('Error')
	}
}

