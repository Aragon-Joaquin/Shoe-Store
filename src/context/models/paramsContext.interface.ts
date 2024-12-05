import { productInformation, shapeOfQuery } from '../../models'

export type keyType = string | number | undefined

export interface multipleQuery {
	productName: (string | number)[]
	categoryName: keyof productInformation
}
export interface searchParamsContext {
	searchParams: URLSearchParams
	selectedParams: Array<string | number>
	queryCategories: () => void
	deleteCategories: () => void
	paramsCategory: (shape: shapeOfQuery['searchBy']) => void
	handleSelectedParams: (keyName: keyType) => void
}
