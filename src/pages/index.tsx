import Billboard from '@/components/Billboard'
import Footer from '@/components/Footer'
import InfoModal from '@/components/InfoModal'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import { useAppStore } from '@/hooks/useAppStore'
import useFavorites from '@/hooks/useFavorites'
import useMovieList from '@/hooks/useMovieList'
import useTmdbMovieList from '@/hooks/useTmdbMovieList'
import { type NextPage, type NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const Home: NextPage = () => {
	useTmdbMovieList()
	const { data: movies = [] } = useMovieList()
	const { data: favorites = [] } = useFavorites()
	const { isOpen, closeModal, tmdbMovies, setTmdbPageIndex } = useAppStore()
	const { ref, inView } = useInView({
		threshold: 0
		// 'rootMargin': '100px 0px'
	})

	useEffect(() => {
		if (inView) setTmdbPageIndex()
	}, [inView])

	return (
		<>
			<Head>
				<title>Netflix Clone App</title>
				<meta
					property='description'
					content='This website is an educational project and is not intended to be an official Netflix replica. 
					The content used on this site is for demonstration and testing of programming and web design skills only. 
					Access to actual Netflix content is not provided. 
					The project is for educational purposes and we are not responsible for any misuse of the site. 
					The end user is responsible for their use of the site.'
				/>
				<meta
					name='keywords'
					content='Next.js, React.js, create-t3-app, Prisma.io, Tailwind CSS, NextAuth.js, Typescript, Mongo'
				/>
			</Head>
			<InfoModal visible={isOpen} onClose={closeModal} />
			<Navbar />
			<Billboard />
			<div className='pb-40'>
				<MovieList title='Trending Now' data={movies} />
				<MovieList title='My List' data={favorites} />
				<MovieList title='TMDB' data={tmdbMovies} isTmdb />
			</div>
			<div ref={ref}>
				<Footer />
			</div>
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
