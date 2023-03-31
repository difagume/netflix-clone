import fetcher from '@/utils/fetcher'
import useSwr from 'swr'

const useMovie = (id?: string | number) => {
	const { data, error, isLoading } = useSwr(id ? `/api/movies/${id}` : null, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})
	return { data, error, isLoading }
}

export default useMovie
