import Header from './pages/Header/Header.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LadingPage/LandingPage.tsx'
import Error404 from './pages/ErrorPage/ErrorPage.tsx'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<Error404 />}>
			<Route path="/" element={<LandingPage />} />
			<Route path="/products" element={<h2>Products</h2>} />
		</Route>
	) //add LazyLoading (documentation)
)

export default function MainApp() {
	return (
		<>
			<Header />
			<RouterProvider router={router} />
			{/* <Footer> */}
		</>
	)
}
