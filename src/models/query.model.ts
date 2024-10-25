import { productInformation } from './product.interface'

type searchByCategory = {
	filterName: keyof productInformation
	currentSearch: string | number
}

export type shapeOfQuery = {
	//endpoint: '' //! there's no endpoint yet since im using a JSON file
	searchBy?: searchByCategory
	limit?: number
}
