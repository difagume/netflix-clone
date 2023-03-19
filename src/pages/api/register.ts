import { prisma } from '@/server/db'
import { hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') return res.status(405).end()

	try {
		const { email, name, password } = req.body

		const existUser = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (existUser) return res.status(422).json({ error: 'Email taken' })

		const hashedPassword = await hash(password, 12)

		const user = await prisma.user.create({
			data: {
				email,
				name,
				hashedPassword,
				image: '',
				emailVerified: new Date()
			}
		})

		return res.status(200).json(user)
	} catch (error) {
		console.error(error)
		return res.status(400).end()
	}
}
