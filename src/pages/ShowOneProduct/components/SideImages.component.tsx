import { productAdapted } from '../../../models'
import { changeImage, imageOnError } from '../utils/utils'

export default function SideImages({
	images,
	title,
	changeImage
}: {
	images: productAdapted['images']
	title: productAdapted['title']
	changeImage: ({ image, currentImageFocus }: changeImage) => void
}) {
	return (
		<aside className="min-w-min bg-mainPalette-darkBrown2 p-4 rounded-xl border-2 border-mainPalette-softBrown2">
			<h3 className="text-xl font-medium mb-3 text-center">All images</h3>
			<div className="flex flex-row gap-x-2 flex-wrap justify-center md:flex-col gap-y-4 items-center">
				{images.map((image) => {
					return (
						<a
							key={image.colorName}
							onClick={() => changeImage({ image })}
							className="border-2 border-mainPalette-softBrown2 rounded-lg bg-mainPalette-darkBrown3 cursor-pointer hover:scale-110 transition-all"
						>
							<img
								src={`${image.images.at(0) ?? imageOnError()}`}
								title={`${title}${image.colorName}`}
								className="min-w-32 w-40 object-contain aspect-video select-none"
								draggable={false}
							/>
						</a>
					)
				})}
			</div>
		</aside>
	)
}
