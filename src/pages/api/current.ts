import serverAuth from '@/utils/serverAuth'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).end()
		}

		const { currentUser } = await serverAuth(req)

		return res.status(200).json(currentUser)
	} catch (error) {
		console.error(error)
		return res.status(500).end()
	}
}
