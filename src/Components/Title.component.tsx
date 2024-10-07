interface TitleParams {
	children: string
	className?: string
}

export function Title({ children, className = '' }: TitleParams) {
	return (
		<>
			<h2
				className={`
                    font-semibold relative p-2 mb-2 text-mainPalette-softWhite text-2xl 
                    ${className}`}
				// add animations later?
			>
				{children}
			</h2>
		</>
	)
}
