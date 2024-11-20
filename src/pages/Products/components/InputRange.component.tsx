import { Button } from '../../../Components'
import Slider from './Slider.component'

export function ProductsFilter({
	totalPrices
}: {
	totalPrices: Array<number>
}) {
	return (
		<aside className='flex flex-col items-start gap-y-4 px-5 py-10 w-72 ml-4 bg-mainPalette-softBrown1/50 rounded'>
			<form className='flex flex-col justify-center relative w-full'>
				<span className='content-[""] bg-mainPalette-softBrown1 border-2 border-mainPalette-darkBrown3/70 rounded-xl w-full h-3 mb-6 relative'>
					<Slider totalPrices={totalPrices} />
				</span>
			</form>
			<div>
				<span>Categories</span>
			</div>
			<Button onClick={(e) => console.log(e)}>Apply filters</Button>
		</aside>
	)
}
