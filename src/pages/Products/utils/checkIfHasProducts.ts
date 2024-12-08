import { API_RESPONSE, productColors, productInformation, productsImages, productSizes } from '../../../models'

type HashHelper =
	| ((product: productColors) => string | number)
	| ((product: productSizes) => string | number)
	| ((product: productsImages) => string | number)

const HASH_CATEGORIES: Record<string, HashHelper> = {
	productColors: (product: productColors) => product.colorName,
	productSizes: (product: productSizes) => product.size,
	productsImages: (product: productsImages) => product.colorName
}

export function checkIfHasProduct(
	category: keyof API_RESPONSE,
	prodFilter: string | number | undefined,
	product: API_RESPONSE | productInformation
): boolean {
	if (!category || !product) return false

	// this is only when searching for product titles without remaking this again
	if (!prodFilter) return category === product['productTitle']

	const productFound = product[category as keyof typeof product]

	if (typeof productFound === 'string' || typeof productFound === 'number') return productFound == prodFilter

	return productFound.some((element) => {
		if (typeof element === 'string') return element === prodFilter
		//@ts-expect-error: throws that the element is the 3 types at the same time, idk how to fix that
		return HASH_CATEGORIES[category](element) == prodFilter
	})
}
