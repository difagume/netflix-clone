import { env } from '@/env.mjs'
import { useRouter } from 'next/router'
import BlurImage from './BlurImage'
import FavoriteButton from './FavoriteButton'
import { ChevronDownIcon, PlayIcon, TmdbIcon } from './Icons'
import { useAppStore } from '@/hooks/useAppStore'
import { type TmdbMovie } from '@/types'
import { setNew } from '@/utils/utils'

const tmdbImageUl = `${env.NEXT_PUBLIC_TMDB_IMG_URL}/t/p/w300`

interface MovieCardProps {
	data: TmdbMovie
}

const MovieCardTmdb: React.FC<MovieCardProps> = ({ data }) => {
	const router = useRouter()
	const { openModal } = useAppStore()
	const image = tmdbImageUl + data?.poster_path

	return (
		<div className='group bg-zinc-900 col-span relative aspect-[2/3] h-[18vw]'>
			<BlurImage
				alt={data?.title}
				src={image}
				className='cursor-pointer object-cover transition duration-500 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-75 w-full h-[18vw]'
			/>
			{/* <Image
				fill
				alt={data?.title}
				src={image}
				className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[18vw]'
			/> */}
			<TmdbIcon className='absolute w-10 bottom-1 right-1 cursor-pointer bg-black bg-opacity-50 p-1 rounded' />
			<div className='opacity-0 absolute top-0 transition bg-zinc-900 rounded-t-md duration-500 z-10 invisible sm:visible delay-75 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'>
				<img
					src={image}
					alt='Movie'
					draggable={false}
					className='cursor-pointer object-contain transition duration shadow-xl rounded-t-md w-full h-[18vw]'
				/>
				<TmdbIcon className='absolute w-10 bottom-1 right-1 cursor-pointer bg-black bg-opacity-50 p-1 rounded' />
				<div className='z-10 bg-zinc-900 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
					<div className='flex flex-row items-center gap-3'>
						<div
							className='cursor-pointer w-6 h-6 lg:w-7 lg:h-7 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
							onClick={() => router.push(`/watch/${data?.id}`)}
						>
							<PlayIcon className='text-black w-5' />
						</div>
						<FavoriteButton movieId={data?.id} isTmdb />
						<div
							onClick={() => openModal(data?.id)}
							className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-7 lg:h-7 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
						>
							<ChevronDownIcon className='text-white group-hover/item:text-neutral-300 w-4' />
						</div>
					</div>
					<p className='text-white font-semibold mt-4'>{data?.title}</p>
					<div className='flex flex-row mt-2 gap-2 items-center'>
						<p className='text-green-400 font-semibold text-[9px] lg:text-sm'>
							{setNew(data?.release_date)}
							<span className='text-white'> {data?.release_date?.substring(0, 4)}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MovieCardTmdb
