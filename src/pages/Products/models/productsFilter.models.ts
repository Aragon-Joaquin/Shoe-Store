import { productColors, productSizes } from '../../../models'

export interface productsInformation {
	categories: Array<string[]>
	colors: Array<productColors[]>
	sizes: Array<productSizes[]>
}
