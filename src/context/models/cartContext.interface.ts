import { productAdapted } from '../../models/product.interface'
import { type_ADD_CART, type_CLEAR_CART, type_DELETE_CART, type_REMOVE_CART } from '../../reducers'
export interface cartCreateContext {
	productsInCart: Array<productAdapted>
	totalPrice: number
	addToCart: ({ type, payload }: type_ADD_CART) => void
	removeFromCart: ({ type, payload }: type_REMOVE_CART) => void
	deleteFromCart: ({ type, payload }: type_DELETE_CART) => void
	clearFromCart: ({ type }: type_CLEAR_CART) => void
}
