import { Link } from 'react-router-dom'
import { Button, Title } from '../../Components'
import { useGetProducts } from '../../hooks'
import { formattToARS, PRODUCTS_PER_PAGE } from '../../utils'
import { Carrousel, ProductsFilter } from './components'
import { Arrow } from '../../assets'

//@ts-expect-error: This is an alias for the assets/images folder setup in Vite.config
import imageAsExample from '@images/portraitShoe.webp'
import { useContext } from 'react'
import { SearchParamsContext } from '../../context/searchParams.context'

export default function Products({ idPage }: { idPage: number }) {
	const { searchParams } = useContext(SearchParamsContext)

	const {
		responseData: { returnResponse },
		cartActions: { addCart }
	} = useGetProducts({ limit: 8, searchParams: searchParams.toString() ?? null })

	const productsInformation = {
		//todo: improve this
		categories: returnResponse.map((el) => el?.tags),
		colors: returnResponse.map((el) => el?.colors),
		sizes: returnResponse.map((el) => el?.sizes)
	}
	return (
		<section className="mt-10 flex flex-col justify-center items-center">
			<Carrousel />

			<Title className="mt-10 bg-mainPalette-darkBrown3 rounded-md px-4 border-2 border-mainPalette-softBrown1/50">
				{searchParams.size > 0
					? `Searching by ${searchParams.size} ${searchParams.size > 1 ? 'filters' : 'filter'}`
					: 'No filters applied.'}
			</Title>

			<article className="flex flex-row gap-x-4 w-full mt-6 h-full">
				<ProductsFilter totalPrice={returnResponse.map((el) => el.price)} productsInformation={productsInformation} />
				<ul className="w-full h-full grid grid-cols-auto-fill-productCol place-items-center items-start gap-x-2 gap-y-4">
					{returnResponse?.map((product) => {
						return (
							<li
								className="w-[200px] bg-mainPalette-darkBrown3 border-2 border-mainPalette-softBrown2/40 p-4 flex flex-col justify-center rounded-sm"
								key={product.idProduct}
							>
								<Link
									to={`/seeProduct/${product.title}`}
									className='w-full flex justify-center 
									after:content-[""] after:h-0.5 after:w-full after:bg-neutral-600/50 after:absolute after:bottom-2'
								>
									<img
										src={imageAsExample}
										alt={`Image of ${product.title}`}
										className="w-40 object-cover aspect-square transition-all hover:scale-110"
									/>
								</Link>

								<div className="flex flex-col">
									<span className="font-bold text-xl cursor-default">{formattToARS.format(product.price)}</span>
									<p className="mt-2 text-nowrap overflow-hidden text-ellipsis cursor-default" title={product.title}>
										{product.title}
									</p>
								</div>

								<Button onClick={() => addCart(product)} className="mt-4">
									Add to cart
								</Button>
							</li>
						)
					})}
				</ul>
			</article>

			<div className="w-full flex flex-row justify-center items-center gap-x-6 mt-10">
				<Arrow className="bg-transparent" />
				<ul className="flex flex-row">
					{returnResponse?.map((_, idx) => {
						const pageNumber = idx % PRODUCTS_PER_PAGE
						if (pageNumber !== 0) return
						return (
							<li
								key={idx}
								className={`w-6 h-6 rounded-full bg-mainPalette-darkBrown1 border-2 border-mainPalette-softBrown1 cursor-pointer hover:scale-110
									${idPage === pageNumber}
									`}
								onClick={() => globalThis.window.location.pathname}
							/>
						)
					})}
				</ul>
				<Arrow className="rotate-180 bg-transparent" />
			</div>
		</section>
	)
}
