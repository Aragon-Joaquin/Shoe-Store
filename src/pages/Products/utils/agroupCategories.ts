import { productColors, productSizes } from '../../../models'

type anyObject = { [key: string]: number }

export function agroupCategories(
	categories: Array<string[]> | Array<productColors[]> | Array<productSizes[]>,
	filterBy?: 'size' | 'colorName'
) {
	const cat: anyObject = {}

	categories.forEach((columnCategory) => {
		if (!columnCategory) return

		columnCategory.forEach((rowCategory) => {
			if (rowCategory == null) return

			if (typeof rowCategory === 'string' && filterBy == null)
				return cat[rowCategory] != null ? (cat[rowCategory] += 1) : (cat[rowCategory] = 1)
			//todo: fix this ts logic
			if (typeof rowCategory !== 'string' && filterBy != null)
				return cat[rowCategory[filterBy as keyof (productColors | productSizes)]] != null
					? (cat[rowCategory[filterBy as keyof (productColors | productSizes)]] += 1)
					: (cat[rowCategory[filterBy as keyof (productColors | productSizes)]] = 1)
		})
	})

	return Object.entries(cat)
}
