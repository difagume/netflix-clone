import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext, type NextPage } from 'next'
import { getSession, signOut } from 'next-auth/react'

const Home: NextPage = () => {
	// const hello = api.example.hello.useQuery({ text: 'from tRPC' })
	const { data: user } = useCurrentUser()

	return (
		<>
			<h1 className='text-4xl text-white'>Netflix Clone</h1>
			<p className='text-white'>Logged in as: {user?.email}</p>

			<button className='h-10 w-full bg-white' onClick={() => signOut()}>
				Logout
			</button>
		</>
	)
}

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context)

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}

export default Home
