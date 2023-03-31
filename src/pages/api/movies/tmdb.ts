import { env } from '@/env.mjs'
import serverAuth from '@/utils/serverAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).end()
		}

		await serverAuth(req)

		const { page } = req.query

		const result = await fetch(
			`${env.TMDB_URL}/3/discover/movie?api_key=${env.TMDB_API}&language=es-EC&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate`
			//`${env.TMDB_URL}/3/movie/popular?api_key=${env.TMDB_API}&language=es-EC&page=${page}`
		)

		if (!result.ok) {
			res.status(result.status).json('El servicio no está disponible, intenta en unos minutos')
		}
		const data = await result.json()
		return res.status(200).json(data.results)
	} catch (error) {
		console.log({ error })
		return res.status(500).end()
	}
}
