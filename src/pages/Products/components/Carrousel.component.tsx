import { useState } from 'react'
import { Arrow } from '../../../assets'

//@ts-expect-error: This is an alias for the assets/images folder setup in Vite.config
import image from '@images/placeHolderShoes.webp'
const CARROUSEL_HIGHLIGHTED = [
	{ id: 1, productName: 'Golden Aatir' },
	{ id: 2, productName: 'Herluis' },
	{ id: 3, productName: 'Sub-Kool' }
] as const

const ARROW_SHARED_CLASSNAME =
	'absolute z-10 top-1/2 -translate-y-1/2 opacity-50 active:opacity-100 sm:hover:opacity-100' as const
const CARROUSEL_LENGTH: number = CARROUSEL_HIGHLIGHTED.length

export function Carrousel() {
	const [carrouselPosition, setCarrouselPosition] = useState(0)

	function handleCarrouselLeft() {
		if (carrouselPosition > 0) setCarrouselPosition((prev) => prev - 1)
		else setCarrouselPosition(CARROUSEL_LENGTH - 1)
	}

	function handleCarrouselRight() {
		if (carrouselPosition + 1 < CARROUSEL_LENGTH) setCarrouselPosition((prev) => prev + 1)
		else setCarrouselPosition(0)
	}
	return (
		<div className="flex flex-row justify-center items-center relative  mx-4">
			<Arrow className={`left-4 ${ARROW_SHARED_CLASSNAME}`} onClick={handleCarrouselLeft} />
			{CARROUSEL_HIGHLIGHTED.map((carrInfo, idx) => {
				return (
					<a key={carrInfo.id} className="select-none relative h-80">
						<img
							src={image}
							alt={`Image of the shoes "${carrInfo.productName}"`}
							title={carrInfo.productName}
							className={`h-full w-full object-cover aspect-video md:aspect-[20/7] rounded-md shadow-md select-none transition-all
                            ${carrouselPosition === idx ? 'relative opacity-100' : 'absolute opacity-0'}`}
						/>
					</a>
				)
			})}
			<ul className="absolute flex flex-row bottom-2 right-1/2 translate-x-1/2 gap-x-2">
				{CARROUSEL_HIGHLIGHTED.map((_dot, idx) => {
					return (
						<li
							key={idx}
							onClick={() => setCarrouselPosition(idx)}
							className={`content-[''] h-5 w-5 rounded-full z-10 bg-mainPalette-darkBrown1 border-2 border-mainPalette-softBrown1 transition-all hover:scale-125 cursor-pointer ${
								carrouselPosition === idx && 'brightness-150 scale-110'
							}`}
						></li>
					)
				})}
			</ul>
			<Arrow className={`!rotate-180 right-4 ${ARROW_SHARED_CLASSNAME}`} onClick={handleCarrouselRight} />
		</div>
	)
}
