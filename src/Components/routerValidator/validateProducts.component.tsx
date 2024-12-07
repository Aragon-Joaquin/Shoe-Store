import { lazy, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UseSearchParamsContext } from '../../context/searchParams.context.tsx'

const Products = lazy(() => import('../../pages/Products/Products.tsx'))

export function ValidateProducts() {
	const { search, pathname } = useLocation()
	const navigate = useNavigate()

	const getIdParam = pathname.replace('/products/', '')
	const parsedParam = Number.parseInt(getIdParam) //! returns NaN if it's undefined

	useEffect(() => {
		if (isNaN(parsedParam)) return navigate({ pathname: '/products/1', search: search ?? '' })
	}, [])

	return (
		<>
			<UseSearchParamsContext>
				<Products idPage={Number(getIdParam)} />
			</UseSearchParamsContext>
		</>
	)
}
