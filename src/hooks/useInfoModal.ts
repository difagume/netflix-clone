/* import { create } from 'zustand'

export interface ModalStoreInterface {
	movieId?: string | number
	isOpen: boolean
	openModal: (movieId: string | number) => void
	closeModal: () => void
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
	movieId: undefined,
	isOpen: false,
	openModal: (movieId: string | number) => set({ isOpen: true, movieId }),
	closeModal: () => set({ isOpen: false, movieId: undefined })
}))

export default useInfoModal */
