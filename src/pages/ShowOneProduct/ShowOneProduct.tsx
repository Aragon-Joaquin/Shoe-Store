import { useState } from 'react'
import { productAdapted, productsImages } from '../../models'
import { Button } from '../../Components'
import { formattToARS } from '../../utils'
import { useGetProducts } from '../../hooks'
import ProductCarrousel from '../../Components/ProductCarrousel.component'
import { coverImage } from './models'
import { imageOnError } from './utils/utils'
import { Link } from 'react-router-dom'

export default function ShowOneProduct({ singleProduct }: { singleProduct: productAdapted }) {
	const [coverImage, setCoverImage] = useState<coverImage>({
		image: singleProduct.images.find((img) => img != null),
		currentImageFocus: 0
	})

	const {
		cartActions: { addCart }
	} = useGetProducts({})

	function changeImage({ image, currentImageFocus = 0 }: { image?: productsImages; currentImageFocus?: number }) {
		setCoverImage((prevState) => ({ image: image ?? prevState.image, currentImageFocus }))
	}
	return (
		<>
			<h2 className="w-3/4 m-auto text-center text-nowrap mt-10 text-2xl font-bold bg-mainPalette-darkBrown2 py-4 rounded-2xl border-2 border-mainPalette-softBrown1">
				{singleProduct.title}
			</h2>
			<main className="flex flex-row w-4/5 m-auto mt-6 ">
				{/* //! images */}
				<aside className="flex flex-col gap-y-4 items-center bg-mainPalette-darkBrown2 p-4 rounded-xl border-2 border-mainPalette-softBrown2 h-fit">
					<h3 className="text-lg font-medium">All images</h3>
					{singleProduct.images.map((image) => {
						return (
							<a
								key={image.colorName}
								onClick={() => changeImage({ image })}
								className="border-2 border-mainPalette-softBrown2 rounded-lg bg-mainPalette-darkBrown3 cursor-pointer hover:scale-110 transition-all"
							>
								<img
									src={`${image.images.at(0) ?? imageOnError()}`}
									title={`${singleProduct.title}${image.colorName}`}
									className="w-40 object-contain aspect-video select-none"
									draggable={false}
								/>
							</a>
						)
					})}
				</aside>
				{/* //! main */}
				<div className="flex-grow flex flex-col justify-center items-center bg-zinc-800/50 mx-2 rounded-2xl h-96 w-auto">
					<img
						src={`${coverImage?.image?.images[coverImage.currentImageFocus] ?? imageOnError()}`}
						className="aspect-square p-5 h-full w-auto object-cover hover:scale-110 transition-all cursor-pointer"
					/>
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
				{/* //! info */}
				<aside className="flex flex-col gap-y-4 bg-mainPalette-darkBrown3 p-4 rounded-xl border-2 border-mainPalette-softBrown1 w-2/6 h-fit">
					<div className="flex flex-row justify-center border-b-2 border-mainPalette-softBrown1 relative">
						<span className="w-full flex flex-row justify-center items-baseline ">
							<h4 className="font-bold text-xl">{singleProduct.title}</h4>
							<p className="text-base text-gray-300 ml-4">{singleProduct.manufacturer}</p>
						</span>
						<h4 className="absolute top-0 right-0 -translate-x-4 text-xl font-bold text-lime-600">
							{formattToARS.format(singleProduct.price)}
						</h4>
					</div>
					<div>
						<h3 className="font-semibold text-lg mb-1">Brief description</h3>
						<p className="p-2 bg-mainPalette-darkBrown2 rounded-md text-pretty">{singleProduct.shortDesc}</p>
					</div>
					<div>
						<h3 className="font-semibold text-lg mb-1">Variants</h3>

						<div className="flex flex-col justify-center m-auto w-3/4 bg-mainPalette-darkBrown2 rounded-md p-2 border-2 border-mainPalette-softBrown1 gap-y-2">
							<div>
								<h4 className="font-medium text-center">Size</h4>
								<ul className="flex flex-row justify-center gap-2">
									{singleProduct.sizes
										.sort((a, b) => a.size - b.size)
										.map(({ size }) => {
											return (
												<li
													key={size}
													className={`bg-slate-500/20 font-medium rounded px-2 py-1 transition-all duration-100 hover:scale-110 cursor-pointer`}
												>
													<span>{size}</span>
												</li>
											)
										})}
								</ul>
							</div>
							<div>
								<h4 className="font-medium text-center">Colors</h4>
								<ul className="flex flex-row justify-center gap-x-3">
									{singleProduct.colors.map(({ colorName, hexColor }) => {
										return (
											<li
												key={colorName}
												className={`content-[""] h-6 w-6 rounded-full border-2 border-transparent/50 cursor-pointer hover:scale-110`}
												style={{ backgroundColor: `${hexColor}` }}
												title={colorName}
											/>
										)
									})}
								</ul>
							</div>
						</div>
					</div>
					<Button
						onClick={() => addCart(singleProduct)}
						className="w-fit h-fit m-auto px-4 bg-mainPalette-darkBrown1/50 text-nowrap"
					>
						Add to cart
					</Button>
				</aside>
			</main>
			{/* //! long description  */}
			<section className="w-full">
				<span className="mt-8 w-1/2 m-auto flex flex-row justify-around bg-customBrown-colorTerciary border-2 border-mainPalette-softBrown1 px-4 py-2">
					{singleProduct.tags.map((tags) => {
						return (
							<Link to={{ pathname: `/products`, search: `productTags=${tags}` }} key={tags}>
								<p className="cursor-pointer font-medium text-lg hover:scale-110 transition-all">{tags}</p>
							</Link>
						)
					})}
				</span>

				<article className="w-11/12 m-auto mt-10 bg-mainPalette-darkBrown3 p-4 rounded-xl border-2 border-mainPalette-softBrown1 flex flex-col gap-y-2">
					<h3 className="text-2xl font-bold">{singleProduct.title}</h3>
					<span className="flex flex-col gap-y-4">
						<div>
							<h4 className="text-lg font-medium">Description</h4>
							<p className="text-pretty bg-mainPalette-darkBrown1 p-2 rounded-md">{singleProduct.longDesc}</p>
						</div>
						<div>
							<h4 className="text-lg font-medium">Details</h4>
							<ul className="flex flex-col justify-start ml-10 gap-y-1">
								{singleProduct.details.map((detail, idx) => {
									return (
										<li className="list-disc" key={idx}>
											{detail}
										</li>
									)
								})}
							</ul>
						</div>
					</span>
				</article>
				<ProductCarrousel apiQuery={{}} titleName="Other products you might like"></ProductCarrousel>
				<ProductCarrousel apiQuery={{}} titleName="Products that you saw earlier"></ProductCarrousel>
			</section>
		</>
	)
}
