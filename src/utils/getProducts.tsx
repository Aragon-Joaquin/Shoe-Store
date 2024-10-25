import { API_ADAPTER, ServerResponse } from '../adapters/products.adapter'
import { API_CALL_DELAYED_SECONDS } from './constants'
import dataJSON from '../__mocks__/products.json'
import { shapeOfQuery, productAdapted } from '../models'

export async function getProducts(apiQuery: shapeOfQuery): Promise<productAdapted[]> {
	//! add trycatch and make a low chance that it could fail the "fetch"
	const response = await new Promise<ServerResponse>((resolve) => {
		setTimeout(async () => {
			const stringify: ServerResponse = await JSON.parse(JSON.stringify(dataJSON))
			resolve(filterByQuery(stringify, apiQuery.searchBy))
		}, API_CALL_DELAYED_SECONDS)
	})

	if (apiQuery?.limit == undefined) return API_ADAPTER(response)
	const truncResults: ServerResponse = {
		data: response.data.filter((product, index) => {
			if (apiQuery?.limit != undefined) return apiQuery.limit <= index ? product : null
			// typescript doesn't understand that the LIMIT is already control above
		}),
		length: response.length
	}
	return API_ADAPTER(truncResults)
}

async function filterByQuery(products: ServerResponse, search: shapeOfQuery['searchBy']) {
	if (search?.filterName === undefined || search?.currentSearch === undefined) return products
	const filtered = products.data.filter((prod) => prod[search.filterName] === search.currentSearch)

	return {
		data: filtered,
		length: filtered.length
	}
}
