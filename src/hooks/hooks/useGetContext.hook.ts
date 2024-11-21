import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context'
import { reducerActionsNames } from '../../reducers'
import { productAdapted } from '../../models'
import { updatePrice } from '../../reducers/utils/updatePrice'

export function useGetContext() {
	const { productsInCart, addToCart, deleteFromCart, clearFromCart, removeFromCart } = useContext(CartContext)

	const [totalPrice, setTotalPrice] = useState<number>(0)
	useEffect(() => setTotalPrice(updatePrice(productsInCart)), [productsInCart])

	const cartActions = {
		//! can use useCallback?
		addCart: (product: productAdapted, quantity: number = 1) =>
			addToCart({
				type: reducerActionsNames.ADD_TO_CART,
				payload: { product, quantity: quantity }
			}),
		removeCart: (idProduct: number) =>
			removeFromCart({
				type: reducerActionsNames.REMOVE_FROM_CART,
				payload: { idProduct }
			}),
		deleteCart: (idProduct: number) =>
			deleteFromCart({
				type: reducerActionsNames.DELETE_FROM_CART,
				payload: { idProduct }
			}),
		clearCart: () =>
			clearFromCart({
				type: reducerActionsNames.CLEAR_CART,
				payload: null
			})
	}
	return {
		productsInCart,
		totalPrice,
		cartActions
	}
}
