import { productColors, productsImages, productSizes } from './productsModels/products.types'

export interface productInformation {
	idProduct: number
	title: string
	type: string
	shortDescription: string | ''
	longDescription: string
	details: Array<string> | []
	manufacturer: string
	sizes: Array<productSizes>
	colors: Array<productColors>
	tags: Array<string> | []
	images: Array<productsImages> | []
	price: number
	quantityInCart: number
}
