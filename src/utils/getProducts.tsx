import { API_ADAPTER, ServerResponse } from '../adapters/products.adapter'
import { API_CALL_DELAYED_SECONDS } from './constants'
import dataJSON from '../__mocks__/products.json'
import { productAdapted, apiRequest, API_RESPONSE } from '../models'
import { checkIfHasProduct } from '../pages/Products/utils/checkIfHasProducts'

//! this is not the most efficient code, but it works
export async function getProducts(apiQuery: apiRequest): Promise<productAdapted[]> {
	const { limit, offset, searchParams } = apiQuery
	const newSearchParams = new URLSearchParams(searchParams ?? '')
	console.log({ newSearchParams: newSearchParams.toString() })
	const response = await new Promise<ServerResponse>((resolve) => {
		setTimeout(async () => {
			const stringify: ServerResponse = await JSON.parse(JSON.stringify(dataJSON))
			if (apiQuery === null) resolve(stringify)

			const productsFiltered = stringify.data.filter((product) => {
				if (newSearchParams?.size === 0) return product
				return newSearchParams
					.entries()
					.every(([category, prodFilter]) => checkIfHasProduct(category as keyof API_RESPONSE, prodFilter, product))
					? product
					: null
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
