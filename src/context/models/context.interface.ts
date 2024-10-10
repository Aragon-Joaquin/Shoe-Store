import { productInformation } from '../../models/product.interface'

export interface cartCreateContext {
	productsInCart: Array<productInformation>
	totalPrice: number
	addToCart(product: productInformation): void
	removeFromCart(product: productInformation): void
}
