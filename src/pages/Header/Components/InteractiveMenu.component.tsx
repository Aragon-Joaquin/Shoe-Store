import { createSearchParams, useNavigate } from 'react-router-dom'
import { Cart, ClueSvg, UserOutlineSVG } from '../../../assets'
import { Button, Input } from '../../../Components'
import { useGetProducts } from '../../../hooks'

const CART_ITEMCOUNT_LIMIT = 9 as const
const INPUT_NAME = 'SearchInput' as const

export function InteractiveMenu({ onClick }: { onClick: () => void }) {
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
		<>
			<form onSubmit={(e) => searchProduct(e)}>
				<Input
					InputType="text"
					PlaceHolderText="Search a product..."
					className="w-48 sm:w-56 pr-8 py-1 bg-mainPalette-darkBrown3 border-2 border-customBrown-colorTerciary"
					formName={INPUT_NAME}
				/>
				<Button type="submit" className="absolute right-5 top-0.5 translate-x-1/2 bg-transparent">
					<ClueSvg />
				</Button>
			</form>
			<UserOutlineSVG className="outline outline-2 outline-offset-2 rounded-full cursor-pointer w-7 h-auto" />
			<div className="relative">
				<Cart className="cursor-pointer w-7 h-auto" onClick={onClick} />
				{!!productsInCart.length && (
					<p className="text-sm font-medium absolute -right-3 -top-3 border-2 translate-x-1/2 border-mainPalette-softWhite rounded-full py-0.5 px-2 pointer-events-none">
						{productsInCart.length > CART_ITEMCOUNT_LIMIT ? '+9' : productsInCart.length}
					</p>
				)}
			</div>
		</>
	)
}
