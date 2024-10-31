interface TitleParams {
	children: string
	className?: string
}

export function Title({ children, className = '' }: TitleParams) {
	return (
		<h3
			className={`
                    font-semibold relative p-2 text-mainPalette-softWhite text-3xl tracking-wide ${className}`}
			// add animations later?
		>
			{children}
		</h3>
	)
}
