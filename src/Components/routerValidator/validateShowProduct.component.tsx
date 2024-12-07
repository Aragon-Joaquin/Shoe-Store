import { useParams } from 'react-router-dom'
import { useGetProducts } from '../../hooks'
import { lazy } from 'react'

const ProductNotFound = lazy(() => import('../../pages/ErrorPage/ProductNotFound'))
const ShowOneProduct = lazy(() => import('../../pages/ShowOneProduct/ShowOneProduct'))

export function ValidateShowProduct() {
	const { productName } = useParams()
	const { returnResponse } = useGetProducts({ searchParams: productName ?? '', limit: 1 })

	return returnResponse[0] == null ? <ProductNotFound /> : <ShowOneProduct singleProduct={returnResponse[0]} />
}
