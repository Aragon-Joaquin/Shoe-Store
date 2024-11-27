import { API_ADAPTER, ServerResponse } from '../adapters/products.adapter'
import { API_CALL_DELAYED_SECONDS } from './constants'
import dataJSON from '../__mocks__/products.json'
import { shapeOfQuery, productAdapted } from '../models'

export async function getProducts(apiQuery: shapeOfQuery): Promise<productAdapted[]> {
	const { limit, offset, searchBy } = apiQuery
	//! add trycatch and make a low chance that it could fail the "fetch"
	const response = await new Promise<ServerResponse>((resolve) => {
		setTimeout(async () => {
			const stringify: ServerResponse = await JSON.parse(JSON.stringify(dataJSON))
			if (apiQuery === null) resolve(stringify)

			const productsFiltered = stringify.data.filter((product) => {
				if (!searchBy) return product
				return searchBy.filterName.every((filter) => filter === product[filter]) ? product : null
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
