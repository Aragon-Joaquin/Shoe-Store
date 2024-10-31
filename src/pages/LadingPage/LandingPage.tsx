import { useGetProducts } from '../../hooks'
import { Title, Route } from '../../Components'
import { APP_NAME, APP_SLOGAN } from '../../utils/constants'

// @ts-expect-error: Is a custom import set in vite.config
import portraitShoe from '@images/portraitShoe.webp'
import ProductShowCase from './components/ProductShowCase.component.tsx'
import ProductServices from './components/ProductServices.component.tsx'

export default function LandingPage() {
	const { returnResponse } = useGetProducts({ limit: 2 })

	return (
		<>
			<header className="relative cc_clip-path-polygon flex flex-col items-center justify-center bg-cover bg-center bg-ladingPageCover h-80 select-none">
				<div className="mb-5 gap-y-3 p-4 flex flex-col items-center after:rounded-xl after:backdrop-blur-md after:bg-gray-700/30 after:w-full after:h-full after:-z-10 after:inset-0 after:absolute">
					<h2 className="font-bold text-3xl">{APP_NAME}</h2>
					<span className="text-center">{APP_SLOGAN}</span>
					<Route anchorURL="/products" typeOfStyling="button">
						Check them out!
					</Route>
				</div>
			</header>

			<article>
				<section className="flex flex-col justify-center items-center">
					<Title>Lorem ipsum dolor sit.</Title>
					<p className="bg-mainPalette-darkBrown1 max-w-[50%] text-center p-4 border-2 border-mainPalette-softBrown1 mb-2 rounded-md">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, modi! Blanditiis pariatur corporis incidunt
						officia eius placeat culpa voluptate dolore.
					</p>
				</section>

				<section>
					<div className="flex flex-col gap-10">
						{returnResponse?.length >= 1 ? (
							returnResponse.map((product, idx) => {
								return (
									<ProductShowCase
										key={product.idProduct}
										URL={`/products/${product.title}`}
										Title={product.title}
										Description={product.longDesc}
										imageSrc={portraitShoe} //! this is hard-coded
										isInverted={idx % 2 == 1 ? true : false}
									/>
								)
							})
						) : (
							<h1 className="h-96 text-9xl font-extrabold text-red-600">need to fix this loading</h1>
						)}
					</div>

					<ProductServices />
				</section>
			</article>
		</>
	)
}
