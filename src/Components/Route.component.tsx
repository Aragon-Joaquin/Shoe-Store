import { ReactNode } from 'react'

export interface RouterParams {
	children: ReactNode
	anchorURL: string
}

export function Route({ children, anchorURL }: RouterParams) {
	return (
		<li>
			<a href={anchorURL} className=" text-base text-zinc-400 hover:text-zinc-200 hover:underline underline-offset-2">
				{children}
			</a>
		</li>
	)
}
