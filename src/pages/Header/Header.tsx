import { AppLogo } from '../../assets/index'
import { Button, Route } from '../../Components'
import { useCallback, useState } from 'react'
import CartSideBar from './Components/cartSideBar.component.tsx'

import { MenuSvg } from '../../assets/Menu.svg.tsx'
import { InteractiveMenu } from './Components/InteractiveMenu.component.tsx'

const differentRoutes = [
	{ URLhref: '', URLName: 'Home' },
	{ URLhref: 'products', URLName: 'Products' }
]

export default function Header() {
	const [toggleCart, setToggleCart] = useState(true)
	const [toggleMenu, setToggleMenu] = useState(false)

	const handleToggle = useCallback(() => setToggleCart((prev) => !prev), [toggleMenu])

	return (
		<nav className=" flex flex-row sm:justify-around justify-between px-4 md:px-10 py-3 items-center bg-mainPalette-darkBrown2 rounded-b-lg overflow-hidden  shadow-lg">
			<div className="flex flex-row gap-x-2 items-center">
				<AppLogo
					titleClassName="text-nowrap text-lg md:text-2xl gap-x-1 md:gap-x-2"
					SVGclassName="w-5 h-5 md:w-auto md:h-auto"
				/>

				<ul className="flex flex-row md:pl-5 gap-x-2 md:gap-x-4">
					{differentRoutes.map((route) => {
						return (
							<li key={route.URLName}>
								<Route anchorURL={`/${route.URLhref}`}>{route.URLName}</Route>
							</li>
						)
					})}
				</ul>
			</div>

			<div className="hidden sm:flex flex-row items-center gap-x-4 py-2 pr-2">
				<InteractiveMenu onClick={handleToggle} />
			</div>

			<Button
				type="button"
				onClick={() => setToggleMenu((prevState) => !prevState)}
				className="sm:hidden w-8 h-auto flex justify-center items-center bg-mainPalette-darkBrown3 z-30"
			>
				<MenuSvg className="w-full" />
			</Button>
			<section
				className={`sm:hidden flex flex-row items-center justify-evenly absolute w-full pr-11 -translate-y-full inset-0 transition-all ${
					toggleMenu && 'translate-y-0 bg-inherit'
				}`}
			>
				<InteractiveMenu onClick={handleToggle} />
			</section>

			<span
				className={`fixed z-40 inset-0 w-screen h-screen backdrop-blur-[1px] bg-black/30 select-none pointer-events-none transition-opacity duration-300
					${toggleCart ? 'opacity-0' : 'opacity-100'}`}
			/>

			<section
				className={`transition-all duration-300 fixed h-full w-[350px] top-0 right-0 bg-black px-4 shadow-xl shadow-black z-50 translate-x-0
					${toggleCart && 'translate-x-full shadow-none '}`}
			>
				<CartSideBar onClick={handleToggle} />
			</section>
		</nav>
	)
}
