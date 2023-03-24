import { prisma } from '@/server/db'
import serverAuth from '@/utils/serverAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).end()
		}

		const { currentUser } = await serverAuth(req)

		const favoritedMovies = await prisma.movie.findMany({
			where: {
				id: {
					in: currentUser?.favoriteIds
				}
			}
		})

		return res.status(200).json(favoritedMovies)
	} catch (error) {
		console.log(error)
		return res.status(500).end()
	}
}
