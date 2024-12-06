import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import { UseCartContext } from './context/cart.context.tsx'

import Layout from './pages/Layout/Layout.tsx'
import { ValidateProducts, ValidateShowProduct } from './Components/index.ts'

const LandingPage = lazy(() => import('./pages/LadingPage/LandingPage.tsx'))
const Error404 = lazy(() => import('./pages/ErrorPage/ErrorPage.tsx'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index path="/" element={<LandingPage />} />
			<Route path="/products" element={<ValidateProducts />} />
			<Route path="/products/:productsPage" element={<ValidateProducts />} />
			<Route path="/seeProduct/:productName" element={<ValidateShowProduct />} />
			<Route path="*" element={<Error404 />} />
		</Route>
	),
	{
		future: {
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_fetcherPersist: true,
			v7_relativeSplatPath: true,
			v7_skipActionErrorRevalidation: true
		}
	}
)
//add LazyLoading (documentation)

export default function MainApp() {
	return (
		<>
			<UseCartContext>
				<RouterProvider router={router} future={{ v7_startTransition: true }} />
			</UseCartContext>
		</>
	)
}
