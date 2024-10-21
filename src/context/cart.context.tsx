import { createContext, ReactElement, useReducer } from 'react'
import { initialState, reducerActionsNames, stateReducer } from '../reducers'
import { cartCreateContext } from './models/cartContext.interface'

export const CartContext = createContext({} as cartCreateContext)

function useProductReducer() {
	const [{ productsInCart, totalPrice }, dispatch] = useReducer(stateReducer, initialState)

	const addToCart = (idProduct: number) =>
		dispatch({
			type: reducerActionsNames.ADD_TO_CART,
			payload: idProduct
		})

	const removeFromCart = (idProduct: number) =>
		dispatch({
			type: reducerActionsNames.REMOVE_FROM_CART,
			payload: idProduct
		})

	return { productsInCart, totalPrice, addToCart, removeFromCart }
}

export function UseCartContext({ children }: { children: Array<ReactElement> }) {
	const { productsInCart, totalPrice, addToCart, removeFromCart } = useProductReducer()
	return (
		<>
			<CartContext.Provider
				value={{
					productsInCart,
					totalPrice,
					addToCart,
					removeFromCart
				}}
			>
				{children}
			</CartContext.Provider>
		</>
	)
}
