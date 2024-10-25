import { useContext, useMemo, useState } from 'react'
import { getProducts } from '../utils'
import { CartContext } from '../context'
import { shapeOfQuery } from '../models'
import { reducerActionsNames } from '../reducers'

export function useGetProducts() {
	const { productsInCart, totalPrice, addToCart, deleteFromCart, clearFromCart, removeFromCart } =
		useContext(CartContext)

	const [apiQuery, setApiQuery] = useState({} as shapeOfQuery)

	const productsFromAPI = useMemo(async () => await getProducts(apiQuery), [apiQuery])

	const cartActions = {
		//! can use useCallback
		addCart: (idProduct: number, quantity?: number) =>
			addToCart({ type: reducerActionsNames.ADD_TO_CART, payload: { idProduct, quantity } }),
		removeCart: (idProduct: number) =>
			removeFromCart({ type: reducerActionsNames.REMOVE_FROM_CART, payload: { idProduct } }),
		deleteCart: (idProduct: number) =>
			deleteFromCart({ type: reducerActionsNames.DELETE_FROM_CART, payload: { idProduct } }),
		clearCart: () => clearFromCart({ type: reducerActionsNames.CLEAR_CART, payload: null })
	}

	return {
		productsFromAPI,
		productFromCart: { productsInCart, totalPrice },
		cartActions,
		setApiQuery
	}
}
