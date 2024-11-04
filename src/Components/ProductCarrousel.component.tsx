import { Arrow } from '../assets'
import { useGetProducts } from '../hooks'
import { shapeOfQuery } from '../models'
import { formattToARS } from '../utils'
import { Button } from './Button.component'
import { Route } from './Route.component'
import { Title } from './Title.component'

// @ts-expect-error: Is a custom import set in vite.config
import portraitShoe from '@images/portraitShoe.webp'

function getImage() {
	return portraitShoe
	//! improve this logic
}

export default function ProductCarrousel({ apiQuery = {}, titleName }: { apiQuery: shapeOfQuery; titleName: string }) {
	//filter - query
	const {
		returnResponse,
		cartActions: { addCart }
	} = useGetProducts(apiQuery)
	return (
		<aside className="my-10">
			<div className="flex justify-center">
				<Title className="bg-mainPalette-darkBrown3 w-min px-10 rounded-t-md border-2 border-mainPalette-softBrown1 border-b-transparent">
					{titleName}
				</Title>
			</div>
			<main className="flex flex-row items-center justify-between bg-mainPalette-darkBrown3 border-y-2 border-mainPalette-softBrown1">
				<Arrow isInverted={false} className="ml-6" />
				<div className="flex flex-row justify-evenly w-full py-5">
					{returnResponse?.map((product) => {
						return (
							<section
								key={product.idProduct}
								className="border-2 border-mainPalette-darkBrown1 rounded-md p-4 bg-mainPalette-darkBrown2/30  w-60 flex flex-col justify-center"
							>
								<img
									src={getImage()}
									alt={product.title}
									title={product.title}
									className="h-40 object-cover border-b-2 border-b-mainPalette-darkBrown2 mb-4 select-none"
								/>

								<div className="">
									<h4 className="text-lg text-center font-bold whitespace-nowrap">{product.title}</h4>
									<p className="text-lime-600 font-bold text-center">{formattToARS.format(product.price)}</p>

									<div className="flex flex-row justify-evenly mt-2 gap-x-2">
										<Route typeOfStyling="button" anchorURL={`/${product.title}`}>
											See more
										</Route>
										<Button onClick={() => addCart(product.idProduct)}>Add to cart</Button>
									</div>
								</div>
							</section>
						)
					})}
				</div>
				<Arrow isInverted className="mr-6" />
			</main>
		</aside>
	)
}
