import { productAdapted } from '../../models/product.interface'

export interface reducerInitialState {
	productsInCart: Array<productAdapted> | []
	totalPrice: number
}

export const initialState: reducerInitialState = {
	productsInCart: [],
	totalPrice: 0
}

export const enum reducerActionsNames {
	ADD_TO_CART = 'addCart',
	REMOVE_FROM_CART = 'removeCart',
	DELETE_FROM_CART = 'deleteFromCart',
	CLEAR_CART = 'clearCart'
}

type basicActions =
	| { type: reducerActionsNames.ADD_TO_CART; payload: { idProduct: number; quantity?: number } }
	| { type: reducerActionsNames.REMOVE_FROM_CART; payload: { idProduct: number } }
	| { type: reducerActionsNames.DELETE_FROM_CART; payload: { idProduct: number } }

export type reducerActions = { type: reducerActionsNames.CLEAR_CART; payload: null } | basicActions
// add 1 or more to cart
// remove 1 quantity of that product
// delete product from cart
// clear cart

export type type_ADD_CART = Extract<reducerActions, { type: reducerActionsNames.ADD_TO_CART }>
export type type_REMOVE_CART = Extract<reducerActions, { type: reducerActionsNames.REMOVE_FROM_CART }>
export type type_DELETE_CART = Extract<reducerActions, { type: reducerActionsNames.DELETE_FROM_CART }>
export type type_CLEAR_CART = Extract<reducerActions, { type: reducerActionsNames.CLEAR_CART }>

// this ones are for the reducer. It helps me out for defining the type of payload & the enum type
