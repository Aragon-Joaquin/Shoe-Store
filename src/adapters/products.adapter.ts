import { productInformation } from '../models/product.interface'
import { renameProducts } from './utils/renameProducts.utils'

export type ServerResponse = {
	data: Array<productInformation>
	length: number
}

export function API_ADAPTER(fetchedItems: ServerResponse) {
	if (!fetchedItems?.data) return []

	return fetchedItems?.data.map((product) => {
		return renameProducts(product)
	})
}
