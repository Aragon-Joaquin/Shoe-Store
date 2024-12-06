import { useSearchParams } from 'react-router-dom'
import { useGetProducts } from '../../hooks'
import { lazy } from 'react'

const ProductNotFound = lazy(() => import('../../pages/ErrorPage/productNotFound'))
const ShowOneProduct = lazy(() => import('../../pages/ShowOneProduct/ShowOneProduct'))

export function ValidateShowProduct() {
	const [searchParams] = useSearchParams()
	const { returnResponse } = useGetProducts({ searchParams: searchParams.toString(), limit: 1 })

	//i could improve this
	return returnResponse[0] == null ? <ProductNotFound /> : <ShowOneProduct singleProduct={returnResponse[0]} />
}
