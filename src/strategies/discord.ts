import passport from 'passport'
import { Profile, Strategy } from 'passport-discord'
import { VerifyCallback } from 'passport-oauth2'
import { User } from '../database/schemas'

passport.use(
	new Strategy(
		{
			clientID: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
			callbackURL: process.env.DISCORD_CALLBACK_URL,
			scope: ['identify', 'email', 'guilds'],
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: Profile,
			done: VerifyCallback
		) => {
			console.log(accessToken, refreshToken)
			console.log(profile)

			const { id: discordId } = profile

			try {

				// updating user
				const existingUser = await User.findOneAndUpdate( { discordId }, { accessToken, refreshToken }, { new: true })
        console.log(`Existing User: ${existingUser}`)
				if (existingUser) return done(null, existingUser)

				// creating new user
				const newUser = await User.create({ discordId, accessToken, refreshToken,})
				const saveUser = await newUser.save()
        return done(null, saveUser)
			
			} catch (err) {
        console.log(err)
        return done(err as any, undefined)
      }
		}
	)
)
