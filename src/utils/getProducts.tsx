import { API_ADAPTER } from '../adapters/products.adapter'
import { API_CALL_DELAYED_SECONDS } from './constants'
import dataJSON from '../__mocks__/products.json'

export function getProducts() {
	//! add trycatch and make a low chance that it could fail the "fetch"
	setTimeout(() => {
		const response = JSON.parse(JSON.stringify(dataJSON))
		return API_ADAPTER(response)
	}, API_CALL_DELAYED_SECONDS)
}
