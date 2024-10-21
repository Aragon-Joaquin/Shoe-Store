import { createContext, ReactElement, useReducer } from 'react'
import { initialState, reducerActions, reducerActionsNames, stateReducer } from '../reducers'

export const CartContext = createContext({})
// createContext({} as cartCreateContext)
//! do i really need type this?

function useProductReducer() {
	const [{ productsInCart, totalPrice }, dispatch] = useReducer(stateReducer, initialState)

	const addToCart = ({ type, payload }: Extract<reducerActions, { type: reducerActionsNames.ADD_TO_CART }>) =>
		dispatch({
			type,
			payload: { idProduct: payload.idProduct, quantity: payload?.quantity }
		})

	const removeFromCart = ({ type, payload }: Extract<reducerActions, { type: reducerActionsNames.REMOVE_FROM_CART }>) =>
		dispatch({
			type,
			payload: { idProduct: payload.idProduct }
		})

	const deleteFromCart = ({ type, payload }: Extract<reducerActions, { type: reducerActionsNames.DELETE_FROM_CART }>) =>
		dispatch({
			type,
			payload: { idProduct: payload.idProduct }
		})

	const clearFromCart = ({ type }: Extract<reducerActions, { type: reducerActionsNames.CLEAR_CART }>) =>
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
