import axios from 'axios'

const DISCORD_API_URL = 'https://discord.com/api/v9'

export const api = axios.create({ baseURL: DISCORD_API_URL })
