import fetcher from '@/utils/fetcher'
import useSwr from 'swr'

const useMovieList = () => {
	const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})
	return { data, error, isLoading }
}

export default useMovieList
