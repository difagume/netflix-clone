import { prisma } from '@/server/db'
import serverAuth from '@/utils/serverAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).end()
		}

		await serverAuth(req)

		const moviesCount = await prisma.movie.count()
		const randomIndex = Math.floor(Math.random() * moviesCount)

		const randomMovies = await prisma.movie.findMany({
			take: 1,
			skip: randomIndex
		})

		return res.status(200).json(randomMovies[0])
	} catch (error) {
		console.error(error)

		return res.status(500).end()
	}
}
