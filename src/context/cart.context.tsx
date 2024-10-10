import { createContext, ReactElement, useReducer } from 'react'
import { initialState, reducerActionsNames, stateReducer } from '../reducers'
import { productInformation } from '../models/product.interface'
import { cartCreateContext } from './models/context.interface'

const CartContext = createContext({} as cartCreateContext)

function useProductReducer() {
	const [{ productsInCart, totalPrice }, dispatch] = useReducer(stateReducer, initialState)

	const addToCart = (product: productInformation) =>
		dispatch({
			type: reducerActionsNames.ADD_TO_CART,
			payload: product
		})

	const removeFromCart = (product: productInformation) =>
		dispatch({
			type: reducerActionsNames.REMOVE_FROM_CART,
			payload: product
		})

	return { productsInCart, totalPrice, addToCart, removeFromCart }
}

export function UseCartContext({ children }: { children: ReactElement }) {
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
