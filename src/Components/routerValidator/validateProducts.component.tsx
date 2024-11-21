import { lazy } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const Products = lazy(() => import('../../pages/Products/Products.tsx'))

export function ValidateProducts() {
	const { productsPage } = useParams()

	const parsedParam = Number.parseInt(productsPage!) //! returns NaN if it's undefined

	return isNaN(parsedParam) ? <Navigate to="/products/1" replace /> : <Products idPage={parsedParam} />
}
