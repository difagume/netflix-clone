import { env } from '@/env.mjs'
import { prisma } from '@/server/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
			// ...other properties
			// role: UserRole;
		} & DefaultSession['user']
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	/* callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id
				// session.user.role = user.role; <-- put other properties on the session here
			}
			return session
		}
	}, */
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text'
				},
				password: {
					label: 'Password',
					type: 'password'
				}
			},
			async authorize(credentials) {
				if (!(credentials?.email && credentials?.password)) {
					throw new Error('Email and password required')
				}
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if (!user?.hashedPassword) {
					throw new Error('Email does not exist')
				}

				const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

				if (!isCorrectPassword) throw new Error('Incorrect password')

				return user
			}
		})
		/* DiscordProvider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET
		}) */
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	],
	pages: {
		signIn: '/auth'
	},
	session: {
		strategy: 'jwt'
	},
	jwt: {
		secret: env.NEXTAUTH_JWT_SECRET
	},
	secret: env.NEXTAUTH_SECRET,
	debug: env.NODE_ENV === 'development'
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext['req']
	res: GetServerSidePropsContext['res']
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}
