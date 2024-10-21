import { createContext, ReactElement, useReducer } from 'react'
import {
	initialState,
	stateReducer,
	type_ADD_CART,
	type_CLEAR_CART,
	type_DELETE_CART,
	type_REMOVE_CART
} from '../reducers'
import { cartCreateContext } from './models/cartContext.interface'

export const CartContext = createContext({} as cartCreateContext)

function useProductReducer() {
	const [{ productsInCart, totalPrice }, dispatch] = useReducer(stateReducer, initialState)

	const addToCart = ({ type, payload }: type_ADD_CART) =>
		dispatch({
			type,
			payload: { idProduct: payload.idProduct, quantity: payload?.quantity }
		})

	const removeFromCart = ({ type, payload }: type_REMOVE_CART) =>
		dispatch({
			type,
			payload: { idProduct: payload.idProduct }
		})

	const deleteFromCart = ({ type, payload }: type_DELETE_CART) =>
		dispatch({
			type,
			payload: { idProduct: payload.idProduct }
		})

	const clearFromCart = ({ type }: type_CLEAR_CART) =>
		dispatch({
			type,
			payload: null
		})

	return { productsInCart, totalPrice, addToCart, removeFromCart, deleteFromCart, clearFromCart }
}

export function UseCartContext({ children }: { children: Array<ReactElement> }) {
	const { productsInCart, totalPrice, addToCart, removeFromCart, deleteFromCart, clearFromCart } = useProductReducer()
	return (
		<CartContext.Provider
			value={{
				productsInCart,
				totalPrice,
				addToCart,
				removeFromCart,
				deleteFromCart,
				clearFromCart
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
