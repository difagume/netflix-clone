import fetcher from '@/utils/fetcher'
import { useEffect } from 'react'
import useSwr from 'swr'
import { useAppStore } from './useAppStore'

const useTmdbMovieList = () => {
	const { tmdbPageIndex, updateTmdbMovies } = useAppStore()

	const { data, error, isLoading, mutate } = useSwr(`/api/movies/tmdb?page=${tmdbPageIndex}`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})

	useEffect(() => {
		if (data) {
			updateTmdbMovies(data)
		}
	}, [data])

	return { error, isLoading }
}

export default useTmdbMovieList
