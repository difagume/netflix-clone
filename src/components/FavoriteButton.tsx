import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { useCallback, useMemo } from 'react'
import { CheckIcon, PlusIcon } from './Icons'

interface FavoriteButtonProps {
	movieId: string | number
	isTmdb?: boolean
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, isTmdb }) => {
	const { mutate: mutateFavorites } = useFavorites()
	const { data: currentUser, mutate } = useCurrentUser()

	const isFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || []

		return list.includes(movieId)
	}, [currentUser, movieId])

	const toggleFavorites = useCallback(async () => {
		const options = {
			method: isFavorite ? 'DELETE' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ movieId })
		}

		const response = await fetch('/api/favorite', options)
		const data = await response.json()

		const updatedFavoriteIds = data.favoriteIds

		mutate({
			...currentUser,
			favoriteIds: updatedFavoriteIds
		})
		mutateFavorites()
	}, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

	const Icon = isFavorite ? CheckIcon : PlusIcon

	return (
		<div
			onClick={toggleFavorites}
			className={`cursor-pointer group/item w-6 h-6 ${
				isTmdb ? 'lg:w-7 lg:h-7' : 'lg:w-10 lg:h-10'
			} border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300`}
		>
			<Icon className={`text-white group-hover/item:text-neutral-300 w-4 ${isTmdb && 'lg:w-5'}`} />
		</div>
	)
}

export default FavoriteButton
