import { ReactNode } from 'react'

export interface RouterParams {
	children: ReactNode
	anchorURL: `/${string}`
	className?: string
	typeOfStyling?: 'button' | 'anchor'
	propFunc?: () => void
}

export function Route({ children, anchorURL, className, propFunc, typeOfStyling = 'anchor' }: RouterParams) {
	function preventReload(e: React.MouseEvent) {
		if (propFunc) propFunc()
		if (globalThis.window.location.pathname === anchorURL) e.preventDefault()
	}
	const defaultStyle =
		typeOfStyling === 'anchor'
			? 'text-base text-zinc-400 hover:text-zinc-200 hover:underline underline-offset-2 cursor-pointer'
			: 'relative border-2 p-2 rounded-md bg-customBrown-colorPrimary/20 border-customBrown-colorPrimary/70 text-mainPalette-softWhite hover:scale-110 transition-all duration-200'

	return (
		<>
			<a href={anchorURL} className={`${defaultStyle} ${className}`} onClick={preventReload}>
				{children}
			</a>
		</>
	)
}
