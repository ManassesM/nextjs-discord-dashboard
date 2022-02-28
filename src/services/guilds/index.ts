import { api } from '../../utils/contants'
import { User } from '../../database/schemas'
import { PartialGuild } from '../../utils/types'


// -- get all the guilds which the bot is connected
export function getBotGuildservice() {
  const TOKEN = process.env.DISCORD_BOT_TOKEN
  
	return api.get<PartialGuild[]>(`/users/@me/guilds`, {
		headers: { Authorization: `Bot ${TOKEN}` },
	})
}

// -- get all the users from a certain guild
export async function getUserGuildsService(id: string) {
	const user = await User.findById(id)
	if (!user) throw new Error('No user found')
	return api.get<PartialGuild[]>(`/users/@me/guilds`, {
		headers: { Authorization: `Bearer ${user.accessToken}` },
	})
}
