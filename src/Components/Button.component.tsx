import { ReactNode } from 'react'

interface ButtonParams {
	children: ReactNode
	className?: string
	type?: 'submit' | 'button'
	onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function Button({ type = 'button', children, className = '', onClick }: ButtonParams) {
	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			className={` bg-mainPalette-darkBrown1 p-1 rounded-lg font-medium hover:scale-110 hover:brightness-110 transition-all ${className}`}
		>
			{children}
		</button>
	)
}
