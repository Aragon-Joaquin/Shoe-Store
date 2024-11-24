import { Button } from '../../../Components'
import { productColors, productSizes } from '../../../models'
import { agroupCategories } from '../utils/agroupCategories'
import AsideCategories from './aside/AsideCategories'
import Slider from './Slider.component'

interface productsInformation {
	categories: Array<string[]>
	colors: Array<productColors[]>
	sizes: Array<productSizes[]>
}

export function ProductsFilter({
	productsInformation,
	totalPrice
}: {
	productsInformation: productsInformation
	totalPrice: Array<number>
}) {
	const { categories, sizes, colors } = productsInformation

	return (
		<aside className="flex flex-col items-start gap-y-2 px-5 py-10 w-72 ml-4 bg-mainPalette-softBrown1/50 rounded">
			<form className="flex flex-col justify-center relative w-full">
				<span className='content-[""] bg-mainPalette-softBrown1 border-2 border-mainPalette-darkBrown3/70 rounded-xl w-full h-3 mb-6 relative'>
					<Slider totalPrices={totalPrice} />
				</span>
			</form>
			<div className="flex flex-col gap-y-2 w-full">
				{/* somewhat simplify this component */}
				<AsideCategories
					categories={agroupCategories(categories)}
					sizes={agroupCategories(sizes, 'size')}
					InfoColors={{ colors: agroupCategories(colors, 'colorName'), hexColors: colors.flat(1) }}
				/>
			</div>
			<Button
				onClick={(e) => console.log(e)}
				className="mx-auto px-2 bg-mainPalette-softBrown2/40 border-2 border-mainPalette-darkBrown2"
			>
				Apply filters
			</Button>
		</aside>
	)
}
