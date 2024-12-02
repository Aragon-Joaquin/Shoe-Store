import { API_ADAPTER, ServerResponse } from '../adapters/products.adapter'
import { API_CALL_DELAYED_SECONDS } from './constants'
import dataJSON from '../__mocks__/products.json'
import { productAdapted, apiRequest } from '../models'

export async function getProducts(apiQuery: apiRequest): Promise<productAdapted[]> {
	const { limit, offset, searchParams } = apiQuery
	const newSearchParams = new URLSearchParams(searchParams ?? '')
	//! add trycatch and make a low chance that it could fail the "fetch"
	const response = await new Promise<ServerResponse>((resolve) => {
		setTimeout(async () => {
			const stringify: ServerResponse = await JSON.parse(JSON.stringify(dataJSON))
			if (apiQuery === null) resolve(stringify)

			const productsFiltered = stringify.data.filter((product, idx) => {
				if (!newSearchParams) return product

				const lol = Array.from(newSearchParams.entries()).every(([category, filter]) => {
					return filter.split('_').every((nameFilter) => {
						const accessProductCat = product[category as keyof typeof product]
						if (typeof accessProductCat === 'number') return accessProductCat === Number(nameFilter)
						//@ts-expect-error: For now, im working with arrays, it's unncesary t	o check if the type of the value is number || string
						console.log(accessProductCat.includes(nameFilter))
						return accessProductCat?.includes(nameFilter)
					})
				})

				console.log(lol)
				return lol ? product : null
			})

			resolve({ data: productsFiltered, length: productsFiltered.length })
		}, API_CALL_DELAYED_SECONDS)
	})
	const truncResults: ServerResponse = {
		data: response.data.slice(offset ?? 0, limit ?? response.data.length),
		length: response.length
	}
	return API_ADAPTER(truncResults)
}
