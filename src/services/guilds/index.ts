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

// -- get all the guilds where the user is an admin and both bot and user are members 
export async function getMutualGuildsService(id: string) {
	const { data: botGuilds } = await getBotGuildservice()
	const { data: userGuilds } = await getUserGuildsService(id)

	// get all the guilds where the user is an admin
	const adminUserGuilds = userGuilds.filter(
		({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
	)
  
  // return the guilds where the bot and the user are members 
	return adminUserGuilds.filter((guild) =>
		botGuilds.some((botGuild) => botGuild.id === guild.id)
	)
}
