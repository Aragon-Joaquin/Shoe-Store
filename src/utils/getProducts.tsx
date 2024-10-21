import { API_ADAPTER, ServerResponse } from '../adapters/products.adapter'
import { API_CALL_DELAYED_SECONDS } from './constants'
import dataJSON from '../__mocks__/products.json'
import { productAdapted } from '../models/product.interface'

export async function getProducts(): Promise<productAdapted[]> {
	//! add trycatch and make a low chance that it could fail the "fetch"
	const response = await new Promise<ServerResponse>((resolve) => {
		setTimeout(async () => {
			const stringify: ServerResponse = await JSON.parse(JSON.stringify(dataJSON))
			resolve(stringify)
		}, API_CALL_DELAYED_SECONDS)
	})

	return API_ADAPTER(response)
}
