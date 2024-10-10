import {
	reducerActions,
	reducerActionsNames,
	reducerInitialState,
	returnStateFuncion
} from './models/reducer.interface'
import { updatePrice } from './utils/updatePrice'

const STATE_ACTIONS = {
	[reducerActionsNames.ADD_TO_CART]: function ({ state, payload }: returnStateFuncion) {
		const { productsInCart } = state

		const productDuplicated = productsInCart.find((product) => product.idProduct === payload.idProduct)
		if (!productDuplicated) return { ...state, payload }

		const productIncrementState = productsInCart.map((product) => {
			if (productDuplicated.idProduct !== product.idProduct) return product
			return {
				...product,
				quantityInCart: product.quantityInCart + 1
			}
		})

		return {
			productsInCart: productIncrementState,
			totalPrice: updatePrice(productIncrementState)
		}
	},
	[reducerActionsNames.REMOVE_FROM_CART]: function ({ state, payload }: returnStateFuncion) {
		const { productsInCart } = state
		const productRemove = productsInCart.filter((product) => product.idProduct !== payload.idProduct)
		return {
			productsInCart: productRemove,
			totalPrice: updatePrice(productRemove)
		}
	}
}

export function stateReducer(state: reducerInitialState, action: reducerActions) {
	const { type, payload } = action
	const finalState = STATE_ACTIONS[type]
	return finalState ? finalState({ state, payload }) : state
}
