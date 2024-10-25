import { productAdapted } from '../../models'

export function updatePrice(products: Array<productAdapted>) {
	return products.reduce((accum, currentProduct) => {
		return accum + currentProduct.price
	}, 0)
}
