export function debouncer<T extends (...args: unknown[]) => void>(customFn: T, timeCicle = 500) {
	let timeout: ReturnType<typeof setTimeout>

	return (...args: Parameters<typeof customFn>) => {
		clearTimeout(timeout)

		timeout = setTimeout(() => {
			customFn.apply(customFn, args)
		}, timeCicle)
	}
}
