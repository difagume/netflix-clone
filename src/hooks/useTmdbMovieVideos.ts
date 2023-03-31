import fetcher from '@/utils/fetcher'
import useSwr from 'swr'

const useTmdbMovieVideos = (id: number) => {
	const { data, error, isLoading } = useSwr(`/api/movies/tmdb/videos/${id}`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})

	return { data, error, isLoading }
}

export default useTmdbMovieVideos
