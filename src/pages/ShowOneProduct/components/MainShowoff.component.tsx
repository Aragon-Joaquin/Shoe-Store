import { productAdapted } from '../../../models'
import { coverImage } from '../models'
import { changeImage, imageOnError } from '../utils/utils'

export default function MainShowoff({
	coverImage,
	manufacturer,
	changeImage
}: {
	coverImage: coverImage
	manufacturer: productAdapted['manufacturer']
	changeImage: ({ image, currentImageFocus }: changeImage) => void
}) {
	return (
		<div className="flex-grow flex flex-col justify-center items-center h-96 sm:h-auto bg-zinc-800/50 mx-2 rounded-2xl aspect-video relative ">
			<img
				src={`${coverImage?.image?.images[coverImage.currentImageFocus] ?? imageOnError()}`}
				className="p-5 aspect-square h-full w-fit object-contain hover:scale-110 transition-all"
				draggable={false}
			/>
			<span className="flex flex-row gap-x-1 text-lg absolute bottom-0 right-0 -translate-x-1/2 -translate-y-1/2">
				{/* i can use an image, if i have one */}
				{!!manufacturer && (
					<>
						by
						<strong className="font-semibold">{manufacturer}</strong>
					</>
				)}
			</span>
			<ul className="flex flex-row gap-x-2">
				{coverImage?.image?.images.map((_, idx) => {
					return (
						<li
							key={idx}
							onChange={() => changeImage({ currentImageFocus: idx })}
							className='content-[""] bg-mainPalette-softWhite h-4 w-4 rounded-full opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer'
						></li>
					)
				})}
			</ul>
		</div>
	)
}
