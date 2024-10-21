import { productAdapted, productInformation } from '../models/product.interface'
import { renameProducts } from './utils/renameProducts.utils'

export type ServerResponse = {
	data: Array<productInformation>
	length: number
}

export function API_ADAPTER(fetchedItems: ServerResponse): Array<productAdapted> {
	return fetchedItems?.data.map((item) => {
		return renameProducts(item)
	})
}
