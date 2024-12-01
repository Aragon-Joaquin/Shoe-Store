import { ReactNode } from 'react'

export default function Category({
	categoryTitle,
	children,
	parentStyles
}: {
	categoryTitle: string
	children?: ReactNode
	parentStyles?: string
}) {
	return (
		<>
			<span className="font-bold text-lg">{categoryTitle}</span>
			<ul className={`w-full ml-1 ${parentStyles}`}>{children}</ul>
		</>
	)
}
