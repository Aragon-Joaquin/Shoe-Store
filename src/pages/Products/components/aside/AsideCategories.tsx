import { useContext } from 'react'
import { keyType, searchParamsContext } from '../../../../context/models'
import { productColors } from '../../../../models'
import Category from './Category'
import { SearchParamsContext } from '../../../../context/searchParams.context'

const onHover = `transition-all duration-100 hover:scale-110 cursor-pointer`

export default function AsideCategories({
	categories,
	sizes,
	infoColors,
	stateManager
}: {
	categories: Array<[string, number]>
	sizes: Array<[string, number]>
	infoColors: { colors: Array<[string, number]>; hexColors: Array<productColors> }
	stateManager: searchParamsContext['paramsCategory']
}) {
	const { colors, hexColors } = infoColors
	const { handleSelectedParams, selectedParams } = useContext(SearchParamsContext)

	const handleMultipleFunc = (keyName: keyType, ...paramsArgs: Parameters<typeof stateManager>) => {
		stateManager(...paramsArgs)
		handleSelectedParams(keyName)
	}

	const returnIfExist = (keyName: keyType): boolean => selectedParams.includes(keyName ?? '')

	return (
		<>
			<Category categoryTitle="Categories">
				{categories.map((key) => {
					return (
						<li
							key={key.at(0)}
							className={`flex flex-row items-end gap-x-1 w-fit ${onHover} ${
								returnIfExist(key.at(0)) && 'bg-mainPalette-softBrown2/50 px-2 rounded-md'
							}`}
							onClick={() => handleMultipleFunc(key.at(0), { productName: key?.at(0), categoryName: 'productTags' })}
						>
							<span className="text-orange-200 font-normal">{`${key.at(0)}`}</span>
							<p className="text-sm">{`(${key.at(1)})`}</p>
						</li>
					)
				})}
			</Category>

			<Category categoryTitle="Sizes" parentStyles="flex flex-row gap-3 flex-wrap justify-center items-center">
				{sizes.map((key) => {
					return (
						<li
							key={key.at(0)}
							className={`bg-slate-500/20 font-medium rounded px-2 py-1 ${onHover}  ${
								returnIfExist(key.at(0)) || 'opacity-50'
							}`}
							onClick={() => handleMultipleFunc(key.at(0), { productName: key?.at(0), categoryName: 'productSizes' })}
						>
							{key.at(0)}
						</li>
					)
				})}
			</Category>

			<Category categoryTitle="Colors" parentStyles="flex flex-col gap-y-2 items-start">
				{colors.map((key) => {
					const hexCode = hexColors.find((el) => el.colorName === key.at(0))
					return (
						<li
							key={key.at(0)}
							title={`${key.at(0)}`}
							style={{ backgroundColor: `${hexCode?.hexColor || '#000'}` }}
							className={`w-max relative font-medium px-2 rounded-sm [text-shadow:_0_1px_4px_rgb(0_0_0_/_100%)] ${onHover}  ${
								returnIfExist(key.at(0)) || 'opacity-50'
							}`}
							onClick={() => handleMultipleFunc(key.at(0), { productName: key?.at(0), categoryName: 'productColors' })}
						>
							{key.at(0)}
						</li>
					)
				})}
			</Category>
		</>
	)
}
