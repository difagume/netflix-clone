export const setNew = (fecha: string) => {
	const fechaLanzamiento = new Date(fecha)
	const fechaActual = new Date()
	const tiempoTranscurrido = fechaActual.getTime() - fechaLanzamiento.getTime()
	const mesesTranscurridos = tiempoTranscurrido / (1000 * 60 * 60 * 24 * 30) // aproximación a meses

	return mesesTranscurridos < 3 ? 'New' : null
}
