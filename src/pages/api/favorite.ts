import type { NextApiRequest, NextApiResponse } from 'next'
import { without } from 'lodash'
import serverAuth from '@/utils/serverAuth'
import { prisma } from '@/server/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { currentUser } = await serverAuth(req)
		const { movieId } = req.body

		const existingMovie = await prisma.movie.findUnique({
			where: {
				id: movieId
			}
		})

		if (!existingMovie) {
			throw new Error('Invalid ID')
		}

		if (req.method === 'POST') {
			const user = await prisma.user.update({
				where: {
					email: currentUser.email || ''
				},
				data: {
					favoriteIds: {
						push: movieId
					}
				}
			})

			return res.status(200).json(user)
		}

		if (req.method === 'DELETE') {
			const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

			const updatedUser = await prisma.user.update({
				where: {
					email: currentUser.email || ''
				},
				data: {
					favoriteIds: updatedFavoriteIds
				}
			})

			return res.status(200).json(updatedUser)
		}

		return res.status(405).end()
	} catch (error) {
		console.error(error)

		return res.status(500).end()
	}
}
