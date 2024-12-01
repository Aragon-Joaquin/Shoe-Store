import { createContext, useCallback, useState } from 'react'
import { contextProps, searchParamsContext } from './models/context.model'
import { useSearchParams } from 'react-router-dom'
import { productInformation, shapeOfQuery } from '../models'

export const SearchParamsContext = createContext({} as searchParamsContext)

interface multipleQuery {
	productName: (string | number)[]
	categoryName: keyof productInformation
}

export function UseSearchParamsContext({ children }: contextProps) {
	const [searchParams, setSearchParams] = useSearchParams(window.location.search)
	const [filterParams, setFilterParams] = useState<Array<multipleQuery>>([])

	const queryCategories = () => {
		if (!filterParams) return
		filterParams.forEach((searchObj) => {
			console.log('asd', searchObj.categoryName, searchObj.productName)
			setSearchParams((params) => {
				params.set(`${searchObj.categoryName}`, `${searchObj.productName.join('_')}`)
				return params
			})
		})
		console.log('searchParams in URL', searchParams)
	}
	// ;[
	// 	['foo', ['bar', 'asd']],
	// 	['foo', 'baz'],
	// 	['foo', 'qux']
	// ]
	const paramsCategory = useCallback(
		(searchBy: shapeOfQuery['searchBy']) => {
			if (!searchBy?.categoryName || !searchBy.productName) return

			const { categoryName, productName } = searchBy

			const hasCategory = filterParams.findIndex((searchObj) => searchObj?.categoryName === categoryName)
			if (hasCategory < 0)
				return setFilterParams((prevState) => [
					...prevState,
					{ categoryName: categoryName, productName: [productName] }
				])

			console.log(filterParams[0].productName.includes(productName))
			if (filterParams[0].productName.includes(productName))
				return setFilterParams((prevState) => [
					...prevState.slice(0, hasCategory),
					{
						categoryName: filterParams[hasCategory].categoryName,
						productName: [...filterParams[0].productName.filter((prd) => prd !== productName)]
					},
					...prevState.slice(hasCategory + 1)
				])
			return setFilterParams((prevState) => [
				...prevState.slice(0, hasCategory),
				{ ...filterParams[hasCategory], productName: [...filterParams[hasCategory].productName, productName] },
				...prevState.slice(hasCategory + 1)
			])
		},
		[filterParams]
	)
	console.log(filterParams)
	//! this should look like this
	// [
	// 	{	productName: [""], categoryName: "categories"	},
	// 	{	productName: [""], categoryName: "colors"		}
	// ]

	return (
		<SearchParamsContext.Provider
			value={{
				searchParams,
				queryCategories,
				paramsCategory
			}}
		>
			{children}
		</SearchParamsContext.Provider>
	)
}
