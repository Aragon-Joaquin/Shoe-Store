import { ClueSvg, UserOutlineSVG, AppLogo, Cart } from '../../assets/index'
import { Button, Input, Route } from '../../Components'
import { useState } from 'react'
import CartSideBar from './Components/cartSideBar.component.tsx'
import { useGetProducts } from '../../hooks/useGetProducts.hook.ts'
import { createSearchParams, useNavigate } from 'react-router-dom'

const differentsRoutes = [
	{ URLhref: '', URLName: 'Home' },
	{ URLhref: 'products', URLName: 'Products' }
]

const CART_ITEMCOUNT_LIMIT = 9 as const
const INPUT_NAME = 'SearchInput' as const

export default function Header() {
	const [toggleCart, setToggleCart] = useState(true)
	const {
		productFromCart: { productsInCart }
	} = useGetProducts(null)
	const navigate = useNavigate()

	function searchProduct(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formName = new FormData(e.currentTarget).get(INPUT_NAME)
		if (!formName) return

		navigate({ pathname: 'products', search: createSearchParams({ productTitle: `${formName}` }).toString() })
	}

	return (
		<nav className="flex flex-row md:justify-around justify-between px-10 py-3 items-center bg-mainPalette-darkBrown2 rounded-b-lg overflow-hidden  shadow-lg">
			<div className="flex flex-row gap-x-2 items-center">
				<AppLogo />

				<ol className="flex flex-row pl-5 gap-x-4">
					{differentsRoutes.map((route) => {
						return (
							<li key={route.URLName}>
								<Route anchorURL={`/${route.URLhref}`}>{route.URLName}</Route>
							</li>
						)
					})}
				</ol>
			</div>

			<div className="flex flex-row items-center gap-x-4 py-2 pr-2">
				<form onSubmit={(e) => searchProduct(e)}>
					<Input
						InputType="text"
						PlaceHolderText="Search a product..."
						className="pr-8 py-1 bg-mainPalette-darkBrown3 border-2 border-customBrown-colorTerciary"
						formName={INPUT_NAME}
					/>
					<Button type="submit" className="absolute right-5 top-0.5 translate-x-1/2 bg-transparent">
						<ClueSvg />
					</Button>
				</form>
				<UserOutlineSVG className="outline outline-2 outline-offset-2 rounded-full cursor-pointer w-7 h-auto" />
				<div className="relative">
					<Cart className="cursor-pointer w-7 h-auto" onClick={() => setToggleCart((prev) => !prev)} />
					{!!productsInCart.length && (
						<p className="text-sm font-medium absolute -right-3 -top-3 border-2 translate-x-1/2 border-mainPalette-softWhite rounded-full py-0.5 px-2 pointer-events-none">
							{productsInCart.length > CART_ITEMCOUNT_LIMIT ? '+9' : productsInCart.length}
						</p>
					)}
				</div>
			</div>

			<span
				className={`fixed z-40 inset-0 w-screen h-screen backdrop-blur-[1px] bg-black/30 select-none pointer-events-none transition-opacity duration-300
					${toggleCart ? 'opacity-0' : 'opacity-100'}`}
			/>

			<section
				className={`transition-all duration-300 fixed h-full w-[350px] top-0 right-0 bg-black px-4 shadow-xl shadow-black z-50 translate-x-0
					${toggleCart && 'translate-x-full shadow-none '}`}
			>
				<CartSideBar onClick={() => setToggleCart(true)} />
			</section>
		</nav>
	)
}
