import { productColors, productsImages, productSizes } from './productsModels/products.types'

export interface API_RESPONSE {
	idProduct: number
	productTitle: string
	productType: string
	productShortDescription: string | ''
	productLongDescription: string
	productDetails: Array<string> | []
	productManufacturer: string
	productSizes: Array<productSizes>
	productColors: Array<productColors>
	productPrice: number
	productTags: Array<string> | []
	productImages: Array<productsImages> | []
}

export interface productInformation extends API_RESPONSE {
	quantityInCart: number
}
