import { productAdapted } from '../../models/product.interface'
export interface cartCreateContext {
	productsInCart: Array<productAdapted>
	totalPrice: number
	addToCart(idProduct: number): void
	removeFromCart(idProduct: number): void
}
