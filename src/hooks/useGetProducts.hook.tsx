import { useEffect, useState } from 'react'
import { getProducts } from '../utils'
import { productAdapted } from '../models/product.interface'

export function useGetProducts() {
	const [productsCached, setProductsCached] = useState<productAdapted[] | undefined>()

	useEffect(() => {
		async function reloadProducts() {
			const promise = await getProducts()
			setProductsCached(promise)
		}
		reloadProducts()
	}, [])

	return { productsCached }
}
