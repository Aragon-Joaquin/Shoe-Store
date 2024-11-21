export const APP_NAME: string = 'Shoe Store' as const
export const APP_SLOGAN: string = 'Lorem ipsum dolor sit amet consectetur.' as const

export const formattToARS = new Intl.NumberFormat('es-AR', {
	style: 'currency',
	currency: 'ARS',
	maximumFractionDigits: 0,
	minimumFractionDigits: 0
})
// for e.g. formattToARS.format(2000) = $ 2.000,00

export const API_CALL_DELAYED_SECONDS: number = 400 as const

export const SCROLLTO_SLIDE_PX: number = 300 as const
export const PRODUCTS_PER_PAGE = 8 as const
export const MAX_QUANTITY_PRODUCTCART = 10 as const
