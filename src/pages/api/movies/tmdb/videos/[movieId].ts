import { env } from '@/env.mjs'
import serverAuth from '@/utils/serverAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).end()
		}

		await serverAuth(req)

		const { movieId } = req.query

		if (!movieId) {
			throw new Error('Missing Id')
		}

		const tmdbMovieId = Number(movieId)

		if (tmdbMovieId) {
			const result = await fetch(`${env.TMDB_URL}/3/movie/${tmdbMovieId}/videos?api_key=${env.TMDB_API}`)

			if (!result.ok) {
				res.status(result.status).json('El servicio no está disponible, intenta en unos minutos')
			}
			const data = await result.json()
			return res.status(200).json(data)
		}
	} catch (error) {
		console.error(error)
		return res.status(500).end()
	}
}
