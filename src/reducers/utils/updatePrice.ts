import { productInformation } from '../../models/product.interface'

export function updatePrice(products: Array<productInformation>) {
	return products.reduce((accum, currentProduct) => {
		return accum + currentProduct.price
	}, 0)
}
