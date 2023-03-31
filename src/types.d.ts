export interface MovieInterface {
	id: string
	title: string
	description: string
	thumbnailUrl: string
	videoUrl: string
	duration: string
	genre: string
}

export interface TmdbResponse {
	page: number
	results: TmdbMovie[]
	total_pages: number
	total_results: number
}

export interface TmdbMovie {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: OriginalLanguage
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export type OriginalLanguage = 'en' | 'es'
