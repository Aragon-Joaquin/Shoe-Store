import { APP_NAME } from '../../utils/constants'
import { ClueSvg, UserOutlineSVG, AppLogo, Cart } from '../../assets/index'
import { Button, Input, Route } from '../../Components'

export default function Header() {
	return (
		<nav className="flex flex-row md:justify-around justify-between px-10 py-3 items-center bg-mainPalette-darkBrown2 rounded-b-lg">
			<div className="flex flex-row gap-x-2 items-center">
				<h3 className="text-2xl cursor-pointer font-bold flex gap-2 items-end ">
					{APP_NAME}
					<AppLogo />

					{/* could be an image + add custom animations on hover*/}
				</h3>

				<ol className="flex flex-row pl-5 gap-x-4">
					<Route anchorURL="/">Home</Route>
					<Route anchorURL="/products">Products</Route>
				</ol>
			</div>

			{/* overflow hidden prevents the clip path flicker */}
			<div className="flex flex-row items-center gap-x-4 overflow-hidden py-2 pr-2">
				<form onSubmit={() => console.log('works')}>
					<Input InputType="text" PlaceHolderText="Search a product..." className="pr-8" />
					<Button
						type="submit"
						onClick={(e) => e.preventDefault()}
						className="absolute top-1.5 right-5 translate-x-1/2 bg-transparent p-0"
					>
						<ClueSvg />
					</Button>
				</form>
				<UserOutlineSVG className="outline outline-2 outline-offset-2 rounded-full cursor-pointer w-7 h-auto" />
				<Cart className="cursor-pointer w-7 h-auto" />
			</div>
		</nav>
	)
}
