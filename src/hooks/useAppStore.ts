import { TmdbMovie } from '@/types'
import { create } from 'zustand'

interface StoreState {
	movieId?: string | number
	isOpen: boolean
	tmdbMovies: TmdbMovie[]
	openModal: (movieId: string | number) => void
	closeModal: () => void
	tmdbPageIndex: number
	setTmdbPageIndex: () => void
	updateTmdbMovies: (movies: TmdbMovie[]) => void
}

export const useAppStore = create<StoreState>((set) => ({
	movieId: undefined,
	isOpen: false,
	tmdbMovies: Array<TmdbMovie>(),
	openModal: (movieId: string | number) => set({ isOpen: true, movieId }),
	closeModal: () => set({ isOpen: false, movieId: undefined }),
	tmdbPageIndex: 1,
	setTmdbPageIndex: () => set(({ tmdbPageIndex }) => ({ tmdbPageIndex: tmdbPageIndex + 1 })),
	// updateTmdbMovies: (movies: TmdbMovie[]) => set((state) => ({ ...state, tmdbMovies: [...state.tmdbMovies, ...movies] }))
	updateTmdbMovies: (movies: TmdbMovie[]) =>
		set((state) => {
			const exist = state.tmdbMovies.some((storeMovies: TmdbMovie) => storeMovies.id === movies[0]?.id)
			return exist ? state : { ...state, tmdbMovies: [...state.tmdbMovies, ...movies] }
		})
}))
