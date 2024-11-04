import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { UseCartContext } from './context/cart.context.tsx'
import { lazy } from 'react'
import Header from './pages/Header/Header.tsx'
import Footer from './pages/Footer/Footer.tsx'

const LandingPage = lazy(() => import('./pages/LadingPage/LandingPage.tsx'))
const Error404 = lazy(() => import('./pages/ErrorPage/ErrorPage.tsx'))
const Products = lazy(() => import('./pages/Products/Products.tsx'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<Error404 />}>
			<Route path="/" element={<LandingPage />} />
			<Route path="/products" element={<Products />} />
		</Route>
	) //add LazyLoading (documentation)
)

export default function MainApp() {
	return (
		<>
			<UseCartContext>
				<Header />
				<RouterProvider router={router} />
				<Footer />
			</UseCartContext>
		</>
	)
}
