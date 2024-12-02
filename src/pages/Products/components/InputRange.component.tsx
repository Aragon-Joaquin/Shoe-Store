import { useContext } from 'react'
import { Button } from '../../../Components'
import { productsInformation } from '../models/productsFilter.models'
import { agroupCategories } from '../utils/agroupCategories'
import AsideCategories from './aside/AsideCategories'
import Slider from './Slider.component'
import { SearchParamsContext } from '../../../context/searchParams.context'
import { useNavigate } from 'react-router-dom'

export function ProductsFilter({
	productsInformation,
	totalPrice
}: {
	productsInformation: productsInformation
	totalPrice: Array<number>
}) {
	const { categories, sizes, colors } = productsInformation
	const { queryCategories, paramsCategory } = useContext(SearchParamsContext)
	const navigate = useNavigate()

	return (
		<aside className="flex flex-col items-start gap-y-2 px-5 py-10 w-72 ml-4 bg-mainPalette-softBrown1/50 rounded">
			<form className="flex flex-col justify-center relative w-full">
				<span className='content-[""] bg-mainPalette-softBrown1 border-2 border-mainPalette-darkBrown3/70 rounded-xl w-full h-3 mb-6 relative'>
					<Slider totalPrices={totalPrice} />
				</span>
			</form>
			<div className="flex flex-col gap-y-2 w-full">
				<AsideCategories
					categories={agroupCategories(categories)}
					sizes={agroupCategories(sizes, 'size')}
					infoColors={{ colors: agroupCategories(colors, 'colorName'), hexColors: colors.flat(1) }}
					stateManager={paramsCategory}
				/>
			</div>

			<div className="flex flex-row items-center justify-center flex-wrap gap-2">
				<Button
					onClick={() => queryCategories()}
					className="mx-auto px-2 bg-mainPalette-softBrown2/40 border-2 border-mainPalette-darkBrown2 text-nowrap w-min"
				>
					Apply filters
				</Button>
				<Button
					onClick={() => navigate(window.location.pathname)}
					className="mx-auto px-2 bg-mainPalette-darkBrown2 border-2 border-mainPalette-softBrown2/40 text-nowrap w-min"
				>
					Delete filters
				</Button>
			</div>
		</aside>
	)
}
