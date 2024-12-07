import { Button, Route } from '../../../Components'
import { useGetProducts } from '../../../hooks/useGetProducts.hook'

//@ts-expect-error: This is an alias for the assets/images folder setup in Vite.config
import imageAsExample from '@images/portraitShoe.webp'
import { formattToARS } from '../../../utils'
import { InputLogic } from './inputLogic.component'

export default function CartSideBar({ onClick }: { onClick: () => void }) {
	const {
		productFromCart: { productsInCart, totalPrice },
		cartActions: { removeCart }
	} = useGetProducts({})

	return (
		<>
			<div className="sticky flex flex-row justify-between items-center border-b-2 border-b-mainPalette-softWhite/50 mb-2 py-2">
				<Button onClick={onClick} className="h-10 w-10 text-lg bg-mainPalette-softBrown2/40">
					✖
				</Button>
				<span className="flex flex-row items-center gap-x-2  text-xl font-semibold">
					{formattToARS.format(totalPrice)}
				</span>
			</div>
			<ul className="list-none h-full flex flex-col gap-y-3 overflow-y-auto pb-24">
				{productsInCart.length > 0 ? (
					productsInCart.map((product) => {
						return (
							<li
								key={product.idProduct}
								className="w-full h-32 flex flex-row gap-x-2 items-center border-2 border-mainPalette-softWhite/30 rounded-l-lg relative"
							>
								<div
									className='relative h-full w-28 bg-mainPalette-softBrown1/30 
									before:absolute before:content-[""] before:inset-0 before:border-r-2 before:border-r-mainPalette-softBrown1'
								>
									<img
										src={imageAsExample}
										alt={`Image of ${product.title}`}
										className="object-contain aspect-square h-full w-auto
										"
									/>
								</div>

								<div className="h-full flex-1 flex flex-col items-center justify-evenly">
									<span className="w-full mt-3 overflow-hidden text-center">
										<h4
											title={product.title}
											className="font-bold text-nowrap text-lg overflow-hidden text-ellipsis mb-0.5 cursor-default"
										>
											{product.title}
										</h4>
										<p className="font-medium text-mainPalette-softBrown1 brightness-200">
											{formattToARS.format(product.price * product.quantityInCart)}
										</p>
									</span>
									<Button
										onClick={() => removeCart(product.idProduct)}
										className="transition-all bg-red-200/20 hover:bg-red-400/30 px-4"
									>
										Remove
									</Button>
								</div>

								<InputLogic quantity={product.quantityInCart} product={product} />
							</li>
						)
					})
				) : (
					<span className="flex flex-col flex-1 items-center h-full mt-10">
						<h3 className="mb-2 text-xl">No products yet {':('}</h3>
						<p className=" text-zinc-400 text-center mb-7">How about we start finding your dreamed product.</p>
						<Route anchorURL="/products" typeOfStyling="button" propFunc={onClick}>
							Go shopping!
						</Route>
					</span>
				)}
			</ul>
		</>
	)
}
