import Image from 'next/image'
import { useState } from 'react'

interface ImageProps {
	src: string
	alt: string
	size?: string
	className?: string
}
const BlurImage: React.FC<ImageProps> = ({ src, alt, size = '25vm', className }) => {
	const [isLoading, setLoading] = useState(true)

	return (
		<Image
			fill
			alt={alt}
			src={src}
			sizes={size}
			className={`${className} object-cover
              duration-700 ease-in-out
              ${isLoading ? 'scale-100 blur-lg grayscale' : 'scale-100 blur-0 grayscale-0'})`}
			onLoadingComplete={() => setLoading(false)}
		/>
	)
}

export default BlurImage
