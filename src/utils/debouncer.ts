export function debouncer(customFn: Function, timeCicle = 500) {
	let timeout: ReturnType<typeof setTimeout>

	return (...args: Parameters<any>) => {
		// i have no idea how to fix this
		clearTimeout(timeout)

		timeout = setTimeout(() => {
			customFn.apply(customFn, args)
		}, timeCicle)
	}
}
