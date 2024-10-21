import Header from './pages/Header/Header.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LadingPage/LandingPage.tsx'
import Error404 from './pages/ErrorPage/ErrorPage.tsx'
import Products from './pages/Products/Products.tsx'
import { UseCartContext } from './context/cart.context.tsx'

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
				{/* <Footer> */}
			</UseCartContext>
		</>
	)
}
