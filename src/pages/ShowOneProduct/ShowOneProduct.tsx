import { useState } from 'react'
import { productAdapted, productsImages } from '../../models'
import { Button } from '../../Components'
import { formattToARS } from '../../utils'

import { useGetProducts } from '../../hooks'
import ProductCarrousel from '../../Components/ProductCarrousel.component'

interface coverImage {
	image: productsImages | undefined
	currentImageFocus: number
}

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
			<h2>{singleProduct.title}</h2>
			<main>
				<aside>
					<h3>All images</h3>
					{singleProduct.images.map((image) => {
						return (
							<a key={image.colorName} onClick={() => changeImage({ image })}>
								<img src={`${image.images.at(0)}`} title={`${singleProduct.title}${image.colorName}`} />
							</a>
						)
					})}
				</aside>
				<div>
					{coverImage.image != null ? (
						<>
							<img src={`${coverImage?.image.images[coverImage.currentImageFocus]}`} />
							<ul>
								{coverImage.image.images.map((_, idx) => {
									return <li key={idx} onChange={() => changeImage({ currentImageFocus: idx })}></li>
								})}
							</ul>
						</>
					) : (
						// set default image
						<img src="" title="Image not found" />
					)}
				</div>
				<aside>
					<div>
						<span>
							<h4>{singleProduct.title}</h4>
							<p>{singleProduct.manufacturer}</p>
						</span>
						<p>{singleProduct.shortDesc}</p>
					</div>

					<div>
						<h3>Variants</h3>
						<li>
							{singleProduct.sizes.map(({ size, quantity }) => {
								return (
									<ul key={size}>
										<span>{size}</span>
										<p>{quantity}</p>
									</ul>
								)
							})}
						</li>
						<li>
							{singleProduct.colors.map(({ colorName, hexColor }) => {
								const bgColor = `bg-${hexColor}`
								return <ul key={colorName} className={`${bgColor}`} title={colorName} />
							})}
						</li>
					</div>
					<h4>{formattToARS.format(singleProduct.price)}</h4>
					<Button onClick={() => addCart(singleProduct)}>Add to cart</Button>
				</aside>
				<span>
					{singleProduct.tags.map((tags) => {
						return tags
					})}
				</span>

				<article>
					<h3>{singleProduct.title}</h3>
					<div>
						<span>
							<p>{singleProduct.longDesc}</p>
							<ul>
								{singleProduct.details.map((detail, idx) => {
									return <li key={idx}>{detail}</li>
								})}
							</ul>
						</span>
					</div>
				</article>
				<ProductCarrousel apiQuery={{}} titleName="Other products you kight like"></ProductCarrousel>
				<ProductCarrousel apiQuery={{}} titleName="Products that you saw earlier"></ProductCarrousel>
			</main>
		</>
	)
}
