import { reducerActions, reducerActionsNames, reducerInitialState } from './models/reducer.interface'
import { updatePrice } from './utils/updatePrice'

const STATE_ACTIONS = {
	//! add
	[reducerActionsNames.ADD_TO_CART]: function ({
		state,
		payload
	}: {
		state: reducerInitialState
		payload: Extract<reducerActions, { type: reducerActionsNames.ADD_TO_CART }>['payload']
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
		payload: Extract<reducerActions, { type: reducerActionsNames.REMOVE_FROM_CART }>['payload']
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
		payload: Extract<reducerActions, { type: reducerActionsNames.DELETE_FROM_CART }>['payload']
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

	//! this throws an error because Quantity es needed in ADD_MULTIPLE_TO_CART but not in the others types.
	// i think i'll refactor this entirely to Switch-Case.
}
