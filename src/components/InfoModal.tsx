import FavoriteButton from '@/components/FavoriteButton'
import PlayButton from '@/components/PlayButton'
import { env } from '@/env.mjs'
import { useAppStore } from '@/hooks/useAppStore'
import useMovie from '@/hooks/useMovie'
import { setNew } from '@/utils/utils'
import { isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import BlurImage from './BlurImage'
import { CloseIcon } from './Icons'

const tmdbImageUl = `${env.NEXT_PUBLIC_TMDB_IMG_URL}/t/p/w780`

interface InfoModalProps {
	visible?: boolean
	onClose: () => void
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
	const { movieId } = useAppStore()
	const { data = {} } = useMovie(movieId)
	const [isVisible, setIsVisible] = useState<boolean>(!!visible)

	const istmdbMovie = !Object.hasOwn(data, 'thumbnailUrl')
	const image = istmdbMovie ? tmdbImageUl + data.backdrop_path : data.thumbnailUrl
	const description = istmdbMovie ? data.overview : data.description

	useEffect(() => {
		setIsVisible(!!visible)
	}, [visible])

	const handleClose = useCallback(() => {
		setIsVisible(false)
		setTimeout(() => {
			onClose()
		}, 300)
	}, [onClose])

	if (!visible || isEmpty(data)) {
		return null
	}

	return (
		<div className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0'>
			<div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
				<div
					className={`${
						isVisible ? 'scale-100' : 'scale-100'
					} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
				>
					<div className='relative h-96'>
						{istmdbMovie ? (
							<BlurImage alt={data?.title} src={image} size='33vm' />
						) : (
							<video
								poster={image}
								autoPlay
								muted
								loop
								src={data?.videoUrl}
								className='w-full brightness-[60%] object-cover h-full'
							/>
						)}
						<div
							onClick={handleClose}
							className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
						>
							<CloseIcon className='text-white w-6' />
						</div>
						<div className='absolute bottom-[10%] left-10'>
							<p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>{data?.title}</p>
							<div className='flex flex-row gap-4 items-center'>
								<PlayButton movieId={data?.id} />
								<FavoriteButton movieId={data?.id} />
							</div>
						</div>
					</div>

					<div className='px-12 py-8'>
						<div className='flex flex-row items-center gap-2 mb-4'>
							{istmdbMovie ? (
								<p className='text-green-400 font-semibold text-lg'>
									{setNew(data?.release_date)}
									<span className='text-white'> {data?.release_date?.substring(0, 4)}</span>
								</p>
							) : (
								<>
									<p className='text-green-400 font-semibold text-lg'>New</p>
									<p className='text-white text-lg'>{data?.duration}</p>
									<p className='text-white text-lg'>{data?.genre}</p>
								</>
							)}
						</div>
						{istmdbMovie && (
							<div className='mb-2'>
								{data.genres?.map((genre: { id: number; name: string }) => (
									<span key={genre.id} className='text-gray-300 text-sm'>
										{`${genre.name} `}
									</span>
								))}
							</div>
						)}
						<p className='text-white text-lg'>{description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoModal
