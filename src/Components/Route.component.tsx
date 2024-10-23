import { ReactNode } from 'react'

export interface RouterParams {
	children: ReactNode
	anchorURL: string
	className?: string
	propFunc?: () => void
}

export function Route({ children, anchorURL, className, propFunc }: RouterParams) {
	function preventReload(e: React.MouseEvent) {
		if (propFunc) propFunc()
		if (globalThis.window.location.pathname === anchorURL) e.preventDefault()
	}
	return (
		<>
			<a
				href={anchorURL}
				className={`text-base text-zinc-400 hover:text-zinc-200 hover:underline underline-offset-2 cursor-pointer ${className}`}
				onClick={preventReload}
			>
				{children}
			</a>
		</>
	)
}
