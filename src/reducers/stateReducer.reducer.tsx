import {
	reducerActions,
	reducerActionsNames,
	reducerInitialState,
	type_ADD_CART,
	type_DELETE_CART,
	type_REMOVE_CART
} from './models/reducer.interface.ts'
import { updatePrice } from './utils/updatePrice'

const STATE_ACTIONS = {
	//! add
	[reducerActionsNames.ADD_TO_CART]: function ({
		state,
		payload
	}: {
		state: reducerInitialState
		payload: type_ADD_CART['payload']
	}): reducerInitialState {
		const { productsInCart } = state

		const newProduct = productsInCart.find((product) => product.idProduct === payload.idProduct)
		if (!newProduct) return { ...state }

		const checkIfExistsQuantity = payload.quantity != undefined ? payload.quantity : 1
		const newState = [{ ...newProduct, quantityInCart: checkIfExistsQuantity }]
		return {
			productsInCart: [...state.productsInCart, ...newState],
			totalPrice: updatePrice([...state.productsInCart, ...newState]) //* this could be wrong
		}
	},

	//! remove one
	[reducerActionsNames.REMOVE_FROM_CART]: function ({
		state,
		payload
	}: {
		state: reducerInitialState
		payload: type_REMOVE_CART['payload']
	}): reducerInitialState {
		const { productsInCart } = state

		const deletedProduct = productsInCart.findIndex((product) => product.idProduct === payload.idProduct)
		if (deletedProduct < 0) return { ...state }

		const calcNewState = [...productsInCart.slice(deletedProduct, deletedProduct)]
		return {
			productsInCart: calcNewState,
			totalPrice: updatePrice(calcNewState)
		}
	},
	//! delete
	[reducerActionsNames.DELETE_FROM_CART]: function ({
		state,
		payload
	}: {
		state: reducerInitialState
		payload: type_DELETE_CART['payload']
	}): reducerInitialState {
		const { productsInCart } = state
		const productRemove = productsInCart.filter((product) => product.idProduct !== payload.idProduct)
		return {
			productsInCart: productRemove,
			totalPrice: updatePrice(productRemove)
		}
	},
	//! clear cart
	[reducerActionsNames.CLEAR_CART]: function (): reducerInitialState {
		const newArray: reducerInitialState['productsInCart'] = []
		return {
			productsInCart: newArray,
			totalPrice: 0
		}
	}
}

export function stateReducer(state: reducerInitialState | undefined, action: reducerActions) {
	if (action?.payload && state?.productsInCart) {
		const finalState = STATE_ACTIONS[action.type]
		return finalState ? finalState({ state, payload: action.payload }) : state
	}
	const finalState = STATE_ACTIONS[reducerActionsNames.CLEAR_CART]
	return finalState()
}
