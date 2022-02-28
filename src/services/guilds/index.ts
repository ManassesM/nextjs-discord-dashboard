import { api } from '../../utils/contants'
import { PartialGuild } from '../../utils/types'

const TOKEN = process.env.DISCORD_BOT_TOKEN

// -- get all the guilds
export function getBotGuildservice() {
	return api.get<PartialGuild[]>(`/users/@me/guilds`, {
		headers: { Authorization: `Bot ${TOKEN}` },
	})
}
