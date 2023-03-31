import { useRouter } from 'next/router'
import useMovie from '@/hooks/useMovie'
import { ArrowLeftIcon } from '@/components/Icons'
import useTmdbMovieVideos from '@/hooks/useTmdbMovieVideos'
import YouTube, { YouTubeProps } from 'react-youtube'
import { env } from '@/env.mjs'

const Watch = () => {
	const router = useRouter()
	const { movieId } = router.query
	const { data } = useMovie(movieId as string)
	const { data: movieVideos } = useTmdbMovieVideos(Number(movieId))

	if (!data) return null

	const opts: YouTubeProps['opts'] = {
		width: '100%',
		height: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			// rel: 0,
			// modestbranding: 1,
			origin: env.NEXT_PUBLIC_URL
		}
	}

	return (
		<div className='h-screen w-screen bg-black'>
			<nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
				<ArrowLeftIcon
					onClick={() => router.push('/')}
					className='w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition'
				/>
				<p className='text-white text-xl md:text-3xl font-bold'>
					<span className='font-light'>Watching:</span> {data?.title}
				</p>
			</nav>
			{movieVideos?.results.length > 0 ? (
				<>
					<YouTube videoId={movieVideos.results[0].key} opts={opts} className='h-full w-full' />
					{/* <iframe
						className="h-full w-full"
						src={`https://www.youtube.com/embed/${movieVideos.results[0].key}?autoplay=1`}
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/> */}
				</>
			) : (
				<video className='h-full w-full' autoPlay controls src={data?.videoUrl} />
			)}
		</div>
	)
}

export default Watch
