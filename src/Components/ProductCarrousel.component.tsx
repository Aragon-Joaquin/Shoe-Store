import { useRef } from 'react'
import { Arrow } from '../assets'
import { useGetProducts } from '../hooks'
import { apiRequest } from '../models'
import { formattToARS, SCROLLTO_SLIDE_PX } from '../utils'
import { Button } from './Button.component'
import { Title } from './Title.component'

// @ts-expect-error: Is a custom import set in vite.config
import portraitShoe from '@images/portraitShoe.webp'
import { Link } from 'react-router-dom'

const commonArrowStyles =
	'mx-1 md:mx-2 lg:mx-5 absolute sm:relative z-20 scale-75 md:scale-100 opacity-50 sm:opacity-100'

export default function ProductCarrousel({ apiQuery = {}, titleName }: { apiQuery: apiRequest; titleName: string }) {
	const {
		responseData: { returnResponse },
		cartActions: { addCart }
	} = useGetProducts(apiQuery)

	const carrouselRef = useRef<HTMLDivElement>(null)

	function scrollCarrousel(direction: 'left' | 'right') {
		const dirScroll = direction === 'left' ? SCROLLTO_SLIDE_PX : -SCROLLTO_SLIDE_PX
		carrouselRef.current?.scrollTo({
			behavior: 'smooth',
			left: carrouselRef.current.scrollLeft + dirScroll,
			top: 0
		})
	}
	return (
		<aside className="my-10">
			<div className="flex justify-center">
				<Title className="bg-mainPalette-darkBrown3 mx-6 w-full sm:w-min text-center sm:text-nowrap text-lg sm:text-2xl px-10 rounded-t-md border-2 border-mainPalette-softBrown1 border-b-transparent">
					{titleName}
				</Title>
			</div>
			<main className="flex flex-row items-center justify-between bg-mainPalette-darkBrown3 border-y-2 border-mainPalette-softBrown1">
				<Arrow className={`${commonArrowStyles}`} onClick={() => scrollCarrousel('right')} />
				<div
					ref={carrouselRef}
					className="grid grid-flow-col gap-x-4 w-full py-5 px-2 overflow-x-scroll no-scrollbar shadow-inner-xl border-x-2 border-mainPalette-softBrown1"
				>
					{returnResponse?.map((product) => {
						return (
							<section
								key={product.idProduct}
								className="border-2 border-mainPalette-darkBrown1 rounded-md p-4 bg-mainPalette-darkBrown2/30 w-32 md:w-40 flex flex-col"
							>
								<Link
									to={`/seeProduct/${product.title}`}
									reloadDocument
									className="h-32 border-b-2 border-b-mainPalette-darkBrown2 mb-2"
								>
									<img
										src={portraitShoe}
										alt={product.title}
										className="h-full w-full object-cover select-none transition-all hover:scale-110"
									/>
								</Link>

								<div>
									<h4
										className="text-xl text-center font-bold whitespace-nowrap overflow-hidden text-ellipsis"
										title={product.title}
									>
										{product.title}
									</h4>
									<div>
										<p className="text-lg text-lime-600 font-bold text-center">{formattToARS.format(product.price)}</p>
									</div>

									<Button onClick={() => addCart(product)} className="text-nowrap w-full m-auto text-center mt-2">
										Add to cart
									</Button>
								</div>
							</section>
						)
					})}
				</div>
				<Arrow className={`!rotate-180 ${commonArrowStyles} right-0`} onClick={() => scrollCarrousel('left')} />
			</main>
		</aside>
	)
}
