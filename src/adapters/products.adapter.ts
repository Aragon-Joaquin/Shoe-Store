import { API_RESPONSE, productAdapted } from '../models'
import { renameProducts } from './utils/renameProducts.utils'

export type ServerResponse = {
	data: Array<API_RESPONSE>
	length: number
}

export function API_ADAPTER(fetchedItems: ServerResponse): Array<productAdapted> {
	return fetchedItems?.data.map((item) => {
		return renameProducts(item)
	})
}
