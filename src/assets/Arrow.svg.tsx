import { SVGParams } from './models/interfacesSvg.models'

type extendedArrowParams = SVGParams & { isInverted: boolean }

export function Arrow({ className, onClick, isInverted }: extendedArrowParams) {
	return (
		<svg
			className={`${
				isInverted ? 'rotate-180' : 'rotate-0'
			} h-auto w-auto cursor-pointer hover:scale-110 transition-all p-2 bg-mainPalette-softBrown2 rounded-full ${className}`}
			onClick={onClick}
			width="36"
			height="36"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12l14 0" />
			<path d="M5 12l6 6" />
			<path d="M5 12l6 -6" />
		</svg>
	)
}
