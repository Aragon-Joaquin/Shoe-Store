import { productAdapted } from '../../../models'
import { formattToARS } from '../../../utils'

export default function SideInformation({
	title,
	type,
	price,
	shortDesc,
	sizes,
	colors
}: {
	title: productAdapted['title']
	type: productAdapted['type']
	price: productAdapted['price']
	shortDesc: productAdapted['shortDesc']
	sizes: productAdapted['sizes']
	colors: productAdapted['colors']
}) {
	return (
		<>
			<span className="w-full flex flex-row justify-center items-center border-b-2 border-mainPalette-softBrown1">
				<h4 className="font-bold text-xl text-nowrap">{title}</h4>
				<p className="text-base text-gray-300 ml-4">{type}</p>
			</span>

			<h4 className="w-fit text-2xl font-bold text-lime-600">{formattToARS.format(price)}</h4>

			<div>
				<h3 className="font-semibold text-lg mb-1">Brief description</h3>

				<p className="p-2 bg-mainPalette-darkBrown2 rounded-md text-pretty md:max-w-60 lg:max-w-none">
					{shortDesc || 'No info provided.'}
				</p>
			</div>
			<div>
				<h3 className="font-semibold text-lg mb-1">Variants</h3>

				<div className="flex flex-col justify-center m-auto w-3/4 bg-mainPalette-darkBrown2 rounded-md p-2 border-2 border-mainPalette-softBrown1 gap-y-2">
					<div>
						<h4 className="font-medium text-center">Size</h4>
						<ul className="flex flex-row justify-center gap-2">
							{sizes
								.sort((a, b) => a.size - b.size)
								.map(({ size }) => {
									return (
										<li
											key={size}
											className={`bg-slate-500/20 font-medium rounded px-2 py-1 transition-all duration-100 hover:scale-110 cursor-pointer`}
										>
											<span>{size}</span>
										</li>
									)
								})}
						</ul>
					</div>
					<div>
						<h4 className="font-medium text-center">Colors</h4>
						<ul className="flex flex-row justify-center gap-x-3">
							{colors.map(({ colorName, hexColor }) => {
								return (
									<li
										key={colorName}
										className={`content-[""] h-6 w-6 rounded-full border-2 border-transparent/50 cursor-pointer hover:scale-110`}
										style={{ backgroundColor: `${hexColor}` }}
										title={colorName}
									/>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
