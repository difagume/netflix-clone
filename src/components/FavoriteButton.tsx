import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { useCallback, useMemo } from 'react'
import { Check, Plus } from './Icons'

interface FavoriteButtonProps {
	movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
	const { mutate: mutateFavorites } = useFavorites()
	const { data: currentUser, mutate } = useCurrentUser()

	const isFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || []

		return list.includes(movieId)
	}, [currentUser, movieId])

	const toggleFavorites = useCallback(async () => {
		let data

		if (isFavorite) {
			const response = await fetch('/api/favorite', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ movieId })
			})
			data = await response.json()
		} else {
			const response = await fetch('/api/favorite', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ movieId })
			})
			data = await response.json()
		}

		const updatedFavoriteIds = data.favoriteIds

		mutate({
			...currentUser,
			favoriteIds: updatedFavoriteIds
		})
		mutateFavorites()
	}, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

	const Icon = isFavorite ? Check : Plus

	return (
		<div
			onClick={toggleFavorites}
			className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
		>
			<Icon className='text-white group-hover/item:text-neutral-300 w-4 lg:w-6' />
		</div>
	)
}

export default FavoriteButton
