import { APP_NAME } from '../utils'

export function AppLogo({
	SVGclassName = '',
	titleclassName = ''
}: {
	SVGclassName?: string
	titleclassName?: string
}) {
	return (
		<h3 className={`text-2xl cursor-pointer font-bold flex gap-2 items-end ${titleclassName}`}>
			{APP_NAME}

			<svg
				className={SVGclassName}
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 6h5.426a1 1 0 0 1 .863 .496l1.064 1.823a3 3 0 0 0 1.896 1.407l4.677 1.114a4 4 0 0 1 3.074 3.89v2.27a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1z" />
				<path d="M14 13l1 -2" />
				<path d="M8 18v-1a4 4 0 0 0 -4 -4h-1" />
				<path d="M10 12l1.5 -3" />
			</svg>

			{/* could be an image + add custom animations on hover*/}
		</h3>
	)
}
