import { API_ADAPTER, ServerResponse } from '../adapters/products.adapter'
import { API_CALL_DELAYED_SECONDS } from './constants'
import dataJSON from '../__mocks__/products.json'
import { productAdapted, apiRequest, productColors, productSizes, productsImages } from '../models'

type HashHelper =
	| ((product: productColors) => string | number)
	| ((product: productSizes) => string | number)
	| ((product: productsImages) => string | number)

const HASH_CATEGORIES: Record<string, HashHelper> = {
	productColors: (product: productColors) => product.colorName,
	productSizes: (product: productSizes) => product.size,
	productsImages: (product: productsImages) => product.colorName
}

//! this is not the most efficient code, but it works
//todo: atomize this mess
export async function getProducts(apiQuery: apiRequest): Promise<productAdapted[]> {
	const { limit, offset, searchParams } = apiQuery
	const newSearchParams = new URLSearchParams(searchParams ?? '')

	const response = await new Promise<ServerResponse>((resolve) => {
		setTimeout(async () => {
			const stringify: ServerResponse = await JSON.parse(JSON.stringify(dataJSON))
			if (apiQuery === null) resolve(stringify)

			const productsFiltered = stringify.data.filter((product) => {
				if (newSearchParams?.size === 0) return product
				return newSearchParams.entries().every(([category, prodFilter]) => {
					console.log({ category, prodFilter })
					if (!category || !prodFilter) return false
					const productFound = product[category as keyof typeof product]

					if (typeof productFound === 'string' || typeof productFound === 'number') return productFound === prodFilter

					return productFound.some((element) => {
						if (typeof element === 'string') return element === prodFilter
						//@ts-expect-error: throws that the element is the 3 types at the same time, idk how to fix that
						return HASH_CATEGORIES[category](element) === prodFilter
					})
				})
					? product
					: null
			})

			resolve({ data: productsFiltered, length: productsFiltered.length })
		}, API_CALL_DELAYED_SECONDS)
	})
	const truncResults: ServerResponse = {
		data: response.data.slice(offset ?? 0, limit ?? response.data.length),
		length: response.length
	}
	return API_ADAPTER(truncResults)
}
