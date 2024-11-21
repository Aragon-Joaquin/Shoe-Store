import {
	reducerActions,
	reducerActionsNames,
	reducerInitialState,
	type_ADD_CART,
	type_DELETE_CART,
	type_REMOVE_CART
} from './models/reducer.interface.ts'

const STATE_ACTIONS = {
	//! add
	[reducerActionsNames.ADD_TO_CART]: function ({
		state,
		payload
	}: {
		state: reducerInitialState
		payload: type_ADD_CART['payload']
	}): reducerInitialState {
		const { product, quantity } = payload

		if (!product) return { ...state }

		const checkIfDup: number = state.productsInCart.findIndex(
			(inCartProduct) => inCartProduct.idProduct === product.idProduct
		)

		if (checkIfDup < 0)
			return {
				productsInCart: [...state.productsInCart, { ...product, quantityInCart: quantity }]
			}

		const newState = {
			...product,
			quantityInCart: quantity + (state.productsInCart.at(checkIfDup)?.quantityInCart || 0)
		}

		return {
			productsInCart: [
				...state.productsInCart.slice(0, checkIfDup),
				newState,
				...state.productsInCart.slice(checkIfDup + 1)
			]
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

		const calcNewState = [
			...state.productsInCart.slice(0, deletedProduct),
			...state.productsInCart.slice(deletedProduct + 1)
		]
		return {
			productsInCart: calcNewState
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
			productsInCart: productRemove
		}
	},
	//! clear cart
	[reducerActionsNames.CLEAR_CART]: function (): reducerInitialState {
		const newArray: reducerInitialState['productsInCart'] = []
		return {
			productsInCart: newArray
		}
	}
}

export function stateReducer(state: reducerInitialState | undefined, action: reducerActions) {
	if (action?.payload && state?.productsInCart) {
		const finalState = STATE_ACTIONS[action.type]
		return finalState
			? //@ts-expect-error: this is more complex that its seems. //!Fix this
			  finalState({ state, payload: action.payload })
			: state
	}
	const finalState = STATE_ACTIONS[reducerActionsNames.CLEAR_CART]
	return finalState()
}
