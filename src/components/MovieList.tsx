import { TmdbMovie, type MovieInterface } from '@/types'
import { isEmpty } from 'lodash'
import MovieCard from './MovieCard'
import MovieCardTmdb from './MovieCardTmdb'

interface MovieListProps {
	data: MovieInterface[] | TmdbMovie[]
	title: string
	isTmdb?: boolean
}

const MovieList: React.FC<MovieListProps> = ({ data, title, isTmdb = false }) => {
	if (isEmpty(data)) {
		return null
	}

	return (
		<div className='px-4 md:px-12 mt-4 space-y-8'>
			<div>
				<p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>{title}</p>
				<div className={`grid gap-2 ${isTmdb ? 'grid-cols-6 lg:grid-cols-7' : 'grid-cols-4'}`}>
					{data.map((movie) =>
						isTmdb ? (
							<MovieCardTmdb key={movie.id} data={movie as TmdbMovie} />
						) : (
							<MovieCard key={movie.id} data={movie as MovieInterface} />
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default MovieList
