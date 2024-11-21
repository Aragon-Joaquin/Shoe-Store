import { ChangeEvent, useState } from 'react'
import { formattToARS } from '../../../utils'

const MINUMUM_PRICE = 100 as const

export default function Slider({ totalPrices }: { totalPrices: Array<number> }) {
	const [maxPrice, minPrice] = [Math.max(...totalPrices, MINUMUM_PRICE), 0]

	const [controlInput, setControlInput] = useState({
		min: minPrice,
		max: maxPrice
	})

	function moveSlider(e: ChangeEvent<HTMLInputElement>, slider: 'min' | 'max') {
		if (!e?.target?.valueAsNumber) return

		//fix this logic
		if (slider === 'min')
			setControlInput((prevState) => ({
				...prevState,
				min: e.target.valueAsNumber
			}))
		if (slider === 'max')
			setControlInput((prevState) => ({
				...prevState,
				max: e.target.valueAsNumber
			}))
	}

	return (
		<>
			<input
				type="range"
				className="double-slider absolute bg-transparent w-full inset-0"
				min={minPrice}
				max={maxPrice}
				value={controlInput.min}
				onChange={(e) => moveSlider(e, 'min')}
			/>
			<input
				type="range"
				className="double-slider absolute bg-transparent w-full inset-0"
				min={minPrice}
				max={maxPrice}
				value={controlInput.max}
				onChange={(e) => moveSlider(e, 'max')}
			/>
			<span className="flex flex-row text-sm justify-between mt-4 cursor-default">
				<p className="font-medium px-1" title="Minimum price selector">
					{formattToARS.format(controlInput.min)}
				</p>
				<p className="bg-mainPalette-softBrown2 font-semibold rounded-md px-1" title="Maximum price selector">
					{formattToARS.format(controlInput.max)}
				</p>
			</span>
		</>
	)
}
