import { productAdapted } from '../../models/product.interface'
export interface cartCreateContext {
	productsInCart: Array<productAdapted>
	totalPrice: number

	//todo: type this
}
