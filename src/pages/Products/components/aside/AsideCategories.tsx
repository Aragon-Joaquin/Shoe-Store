import { productColors } from '../../../../models'

export default function AsideCategories({
	categories,
	sizes,
	InfoColors
}: {
	categories: Array<[string, number]>
	sizes: Array<[string, number]>
	InfoColors: { colors: Array<[string, number]>; hexColors: Array<productColors> }
}) {
	const { colors, hexColors } = InfoColors
	const onHover = `transition-all duration-100 hover:scale-110 cursor-pointer`
	return (
		<>
			<span className="font-bold text-lg">Categories</span>
			<ul>
				{categories.map((key) => {
					return (
						<li key={key.at(0)} className={`flex flex-row items-end gap-x-1 ${onHover}`}>
							<span className="text-orange-200 font-normal">{`${key.at(0)}`}</span>
							<p className="text-sm">{`(${key.at(1)})`}</p>
						</li>
					)
				})}
			</ul>
			<span className="font-bold text-lg">Sizes</span>
			<ul className="flex flex-row gap-3 flex-wrap justify-center items-center">
				{sizes.map((key) => {
					return (
						<li
							key={key.at(0)}
							className={`bg-slate-500/20 font-medium rounded px-2 py-1 hover:scale-110 cursor-pointer ${onHover}`}
						>
							{key.at(0)}
						</li>
					)
				})}
			</ul>
			<span className="font-bold text-lg">Colors</span>
			<ul className="flex flex-col gap-y-2 items-start w-full">
				{colors.map((key) => {
					const hexCode = hexColors.find((el) => el.colorName === key.at(0))
					return (
						<li
							key={key.at(0)}
							title={`${key.at(0)}`}
							style={{ backgroundColor: `${hexCode?.hexColor || '#000'}` }}
							className={`w-fit font-medium px-2 rounded-sm [text-shadow:_0_1px_4px_rgb(0_0_0_/_100%)] ${onHover}r`}
						>
							{key.at(0)}
						</li>
					)
				})}
			</ul>
		</>
	)
}
