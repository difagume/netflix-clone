import Billboard from '@/components/Billboard'
import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext, type NextPage } from 'next'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
	// const hello = api.example.hello.useQuery({ text: 'from tRPC' })
	const { data: user } = useCurrentUser()

	return (
		<>
			<Navbar />
			<Billboard />
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
