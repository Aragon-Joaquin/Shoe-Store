import { useEffect, useRef, useState } from 'react'
import { getProducts } from '../utils'
import { apiRequest, productAdapted } from '../models'
import { useGetContext } from './hooks/useGetContext.hook'

interface ResponseInformation {
	returnResponse: Array<productAdapted> | []
	isEmpty: boolean | null
}

export function useGetProducts(apiQuery: apiRequest | null) {
	const { productsInCart, totalPrice, cartActions } = useGetContext()

	const [responseData, setResponseData] = useState<ResponseInformation>({ returnResponse: [], isEmpty: null })
	const lastQuery = useRef<apiRequest>()

	useEffect(() => {
		if (apiQuery === null) return

		if (JSON.stringify(lastQuery.current) === JSON.stringify(apiQuery)) return
		lastQuery.current = apiQuery
		async function waitToResponse() {
			const returnResponse = await getProducts(apiQuery!)
			if (returnResponse.length > 0) setResponseData({ returnResponse, isEmpty: true })
			setResponseData({ returnResponse, isEmpty: false })
		}
		waitToResponse()
	}, [apiQuery])

	return {
		apiQuery,
		responseData,
		productFromCart: {
			productsInCart,
			totalPrice
		},
		cartActions
	}
}
