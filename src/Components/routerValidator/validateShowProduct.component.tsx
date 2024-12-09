import { useParams } from 'react-router-dom'
import { useGetProducts } from '../../hooks'
import { lazy } from 'react'

const ProductNotFound = lazy(() => import('../../pages/ErrorPage/ProductNotFound'))
const ShowOneProduct = lazy(() => import('../../pages/ShowOneProduct/ShowOneProduct'))

export function ValidateShowProduct() {
	const { productName } = useParams()
	const {
		responseData: { returnResponse, isEmpty }
	} = useGetProducts({ searchParams: productName ?? '', limit: 1 })

	// i have no idea how to do when the state is RENDERED
	if (isEmpty === true) return <ProductNotFound />
	if (isEmpty === false) return <ShowOneProduct singleProduct={returnResponse[0]} />
}
