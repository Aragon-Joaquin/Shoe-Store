import { productInformation } from '../../models/product.interface'

export interface reducerInitialState {
	productsInCart: Array<productInformation> | []
	totalPrice: number
}

export const initialState: reducerInitialState = {
	productsInCart: [],
	totalPrice: 0
}

export enum reducerActionsNames {
	ADD_TO_CART = 'addCart',
	REMOVE_FROM_CART = 'removeCart'
}

export type returnStateFuncion = { state: reducerInitialState; payload: productInformation }

export type reducerActions =
	| { type: reducerActionsNames.ADD_TO_CART; payload: productInformation }
	| { type: reducerActionsNames.REMOVE_FROM_CART; payload: productInformation }
