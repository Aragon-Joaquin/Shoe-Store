import { useContext, useEffect, useMemo, useState } from 'react'
import { getProducts } from '../utils'
import { CartContext } from '../context'
import { productAdapted, shapeOfQuery } from '../models'
import { reducerActionsNames } from '../reducers'

export function useGetProducts(apiQuery: shapeOfQuery) {
	const { productsInCart, totalPrice, addToCart, deleteFromCart, clearFromCart, removeFromCart } =
		useContext(CartContext)

	const [returnResponse, setReturnResponse] = useState([] as Array<productAdapted> | [])

	const productsFromAPI = useMemo(async () => await getProducts(apiQuery), [apiQuery])

	useEffect(() => {
		async function waitToResponse() {
			const responseData = await productsFromAPI
			setReturnResponse(responseData)
		}
		waitToResponse()
	}, [productsFromAPI])

	const cartActions = {
		//! can use useCallback?
		addCart: (idProduct: number, quantity?: number) =>
			addToCart({ type: reducerActionsNames.ADD_TO_CART, payload: { idProduct, quantity } }),
		removeCart: (idProduct: number) =>
			removeFromCart({ type: reducerActionsNames.REMOVE_FROM_CART, payload: { idProduct } }),
		deleteCart: (idProduct: number) =>
			deleteFromCart({ type: reducerActionsNames.DELETE_FROM_CART, payload: { idProduct } }),
		clearCart: () => clearFromCart({ type: reducerActionsNames.CLEAR_CART, payload: null })
	}
	return {
		returnResponse,
		productFromCart: { productsInCart, totalPrice },
		cartActions
	}
}
