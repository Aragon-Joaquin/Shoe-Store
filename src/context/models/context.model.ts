import { ReactElement } from 'react'
import { shapeOfQuery } from '../../models'

export interface contextProps {
	children: Array<ReactElement> | ReactElement
}

export interface searchParamsContext {
	searchParams: URLSearchParams
	queryCategories: () => void
	paramsCategory: (shape: shapeOfQuery['searchBy']) => void
}
