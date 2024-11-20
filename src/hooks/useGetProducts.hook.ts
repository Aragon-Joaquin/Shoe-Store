import { useEffect, useRef, useState } from 'react'
import { getProducts } from '../utils'
import { productAdapted, shapeOfQuery } from '../models'
import { useGetContext } from './hooks/useGetContext.hook'

export function useGetProducts(apiQuery: shapeOfQuery | null) {
	const { productsInCart, totalPrice, cartActions } = useGetContext()

	const [returnResponse, setReturnResponse] = useState(
		[] as Array<productAdapted> | []
	)
	const lastQuery = useRef<shapeOfQuery>()

	useEffect(() => {
		if (apiQuery === null) return

		if (JSON.stringify(lastQuery.current) === JSON.stringify(apiQuery))
			return
		lastQuery.current = apiQuery
		async function waitToResponse() {
			const responseData = await getProducts(apiQuery!)
			setReturnResponse(responseData)
		}
		waitToResponse()
	}, [apiQuery])

	useEffect(() => {}, [productsInCart])

	return {
		apiQuery,
		returnResponse,
		productFromCart: {
			productsInCart,
			totalPrice: totalPrice
		},
		cartActions
	}
}
