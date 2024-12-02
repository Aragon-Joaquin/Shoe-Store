import { productInformation } from './product.interface'

export type shapeOfQuery = {
	//endpoint: '' //! there's no endpoint yet since im using a JSON file
	searchBy?: {
		productName?: string | number | undefined
		categoryName?: keyof productInformation
	}
}
export type apiRequest = {
	limit?: number
	offset?: number
	searchParams?: string
}
