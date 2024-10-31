import { Button, Route } from '../../../Components'
import { useGetProducts } from '../../../hooks/useGetProducts.hook'

export default function CartSideBar({ onClick }: { onClick: () => void }) {
	const {
		productFromCart: { productsInCart },
		cartActions: { removeCart }
	} = useGetProducts({})
	return (
		<>
			<Button onClick={onClick} className="mt-4 bg-mainPalette-softBrown2/40">
				✖
			</Button>
			<ul className="list-none h-full">
				{productsInCart.length > 0 ? (
					productsInCart.map((product) => {
						return (
							<li key={product.idProduct} onClick={() => removeCart(product.idProduct)}>
								{product.title}
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
