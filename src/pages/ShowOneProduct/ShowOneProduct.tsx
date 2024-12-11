import { useCallback, useState } from 'react'
import { productAdapted } from '../../models'
import ProductCarrousel from '../../Components/ProductCarrousel.component'
import { coverImage } from './models'
import { changeImage } from './utils/utils'
import { Link } from 'react-router-dom'
import SideImages from './components/SideImages.component'
import MainShowoff from './components/MainShowoff.component'
import SideInformation from './components/SideInformation.component'
import { Button } from '../../Components'
import { useGetProducts } from '../../hooks'

export default function ShowOneProduct({ singleProduct }: { singleProduct: productAdapted }) {
	const { title, manufacturer, images, type, price, shortDesc, sizes, colors, details, longDesc, tags } = singleProduct

	const [coverImage, setCoverImage] = useState<coverImage>({
		image: images.find((img) => img != null),
		currentImageFocus: 0
	})

	const {
		cartActions: { addCart }
	} = useGetProducts({})

	const changeImage = useCallback(
		({ image, currentImageFocus = 0 }: changeImage) => {
			setCoverImage((prevState) => ({ image: image ?? prevState.image, currentImageFocus }))
		},
		[coverImage]
	)

	return (
		<>
			<h2 className="w-3/4 m-auto text-center text-nowrap mt-10 text-2xl font-bold bg-mainPalette-darkBrown2 py-4 rounded-2xl border-2 border-mainPalette-softBrown1">
				{title}
			</h2>
			<main className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row mx-4 sm:mx-20 md:mx-10 lg:mx-28 m-auto mt-6">
				<SideImages images={images} changeImage={changeImage} title={title} />
				<MainShowoff coverImage={coverImage} manufacturer={manufacturer} changeImage={changeImage} />
				<aside className="flex min-w-64 flex-col gap-y-4 bg-mainPalette-darkBrown3 p-4 rounded-xl border-2 border-mainPalette-softBrown1 lg:w-2/6 h-fit">
					<SideInformation
						title={title}
						type={type}
						price={price}
						shortDesc={shortDesc}
						sizes={sizes}
						colors={colors}
					/>
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
				<span className="mt-8 w-fit md:w-1/2 items-center gap-y-2 md:gap-y-0 m-auto flex flex-col md:flex-row justify-around bg-customBrown-colorTerciary border-2 border-mainPalette-softBrown1 px-4 py-2">
					{tags.length > 0 ? (
						tags.map((tags) => {
							return (
								<Link to={{ pathname: `/products`, search: `productTags=${tags}` }} key={tags}>
									<p className="cursor-pointer font-medium text-lg hover:scale-110 transition-all">{tags}</p>
								</Link>
							)
						})
					) : (
						<p className="font-medium text-xl">No tags provided</p>
					)}
				</span>

				<article className="w-11/12 m-auto mt-10 bg-mainPalette-darkBrown3 p-4 rounded-xl border-2 border-mainPalette-softBrown1 flex flex-col gap-y-2">
					<h3 className="text-2xl font-bold">{title}</h3>
					<span className="flex flex-col gap-y-4 px-5">
						<div>
							<h4 className="text-lg font-medium">Description</h4>
							<p className="text-pretty bg-mainPalette-darkBrown1 p-2 rounded-md">
								{longDesc || 'No description provided.'}
							</p>
						</div>
						{details.length > 0 && (
							<div>
								<h4 className="text-lg font-medium">Details</h4>
								<ul className="flex flex-col justify-start ml-10 gap-y-1">
									{details.map((detail, idx) => {
										return (
											<li className="list-disc" key={idx}>
												{detail}
											</li>
										)
									})}
								</ul>
							</div>
						)}
					</span>
				</article>
				<ProductCarrousel apiQuery={{}} titleName="Other products you might like"></ProductCarrousel>
				<ProductCarrousel apiQuery={{}} titleName="Products that you saw earlier"></ProductCarrousel>
			</section>
		</>
	)
}
