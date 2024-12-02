import { productInformation, shapeOfQuery } from '../../models'

export interface multipleQuery {
	productName: (string | number)[]
	categoryName: keyof productInformation
}
export interface searchParamsContext {
	searchParams: URLSearchParams
	queryCategories: () => void
	paramsCategory: (shape: shapeOfQuery['searchBy']) => void
}
