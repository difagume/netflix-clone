import { env } from '@/env.mjs'
import { prisma } from '@/server/db'
import serverAuth from '@/utils/serverAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).end()
		}

		await serverAuth(req)

		const { movieId } = req.query
		const tmdbMovieId = Number(movieId)

		if (tmdbMovieId) {
			const result = await fetch(`${env.TMDB_URL}/3/movie/${tmdbMovieId}?api_key=${env.TMDB_API}&language=es-EC`)

			if (!result.ok) {
				res.status(result.status).json('El servicio no está disponible, intenta en unos minutos')
			}
			const data = await result.json()
			return res.status(200).json(data)
		}

		if (typeof movieId !== 'string') {
			throw new Error('Invalid Id')
		}

		if (!movieId) {
			throw new Error('Missing Id')
		}

		const movies = await prisma.movie.findUnique({
			where: {
				id: movieId
			}
		})

		return res.status(200).json(movies)
	} catch (error) {
		console.error(error)
		return res.status(500).end()
	}
}
