import { createContext, useCallback, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { contextProps, keyType, multipleQuery, searchParamsContext } from './models'
import { shapeOfQuery } from '../models'

export const SearchParamsContext = createContext({} as searchParamsContext)

export function UseSearchParamsContext({ children }: contextProps) {
	const [searchParams, setSearchParams] = useSearchParams(window.location.search)
	const [filterParams, setFilterParams] = useState<Array<multipleQuery>>([])
	const [selectedParams, setSelectedParams] = useState<Array<string | number>>([])

	const handleSelectedParams = (keyName: keyType) => {
		if (!keyName) return
		return selectedParams.includes(keyName)
			? setSelectedParams((prevState) => prevState.filter((elmnt) => elmnt !== keyName))
			: setSelectedParams((prevState) => [...prevState, keyName])
	}

	const queryCategories = () => {
		if (!filterParams) return
		filterParams.forEach((searchObj) => {
			setSearchParams((params) => {
				params.set(`${searchObj.categoryName}`, `${searchObj.productName.join('_')}`)
				return params
			})
		})
	}

	const deleteCategories = () => {
		setFilterParams([])
		setSelectedParams([])
		setSearchParams()
	}

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

			if (filterParams[hasCategory].productName.includes(productName))
				return setFilterParams((prevState) => {
					if (filterParams[hasCategory].productName.length <= 1)
						return [...prevState.slice(0, hasCategory), ...prevState.slice(hasCategory + 1)]
					return [
						...prevState.slice(0, hasCategory),
						{
							categoryName: filterParams[hasCategory].categoryName,
							productName: [...filterParams[hasCategory].productName.filter((prd) => prd !== productName)]
						},
						...prevState.slice(hasCategory + 1)
					]
				})

			return setFilterParams((prevState) => [
				...prevState.slice(0, hasCategory),
				{ ...filterParams[hasCategory], productName: [...filterParams[hasCategory].productName, productName] },
				...prevState.slice(hasCategory + 1)
			])
		},
		[filterParams]
	)
	//! this should look like this
	// [
	// 	{	productName: [""], categoryName: "categories"	},
	// 	{	productName: [""], categoryName: "colors"		}
	//

	return (
		<SearchParamsContext.Provider
			value={{
				searchParams,
				selectedParams,
				queryCategories,
				paramsCategory,
				deleteCategories,
				handleSelectedParams
			}}
		>
			{children}
		</SearchParamsContext.Provider>
	)
}
