import { useRef } from 'react'
import { Arrow } from '../../../assets'
import { debouncer, MAX_QUANTITY_PRODUCTCART } from '../../../utils'
import { useGetProducts } from '../../../hooks'
import { productAdapted } from '../../../models'

export function InputLogic({
	quantity,
	product
}: {
	quantity: number
	product: productAdapted
}) {
	const inputRef = useRef<HTMLInputElement>(null)

	const {
		cartActions: { addCart, removeCart }
	} = useGetProducts(null)

	const controlQuantity = debouncer((addQuant: number) => {
		let { current } = inputRef

		//maybe in a future i use this logic with a custom hook in ./utils
		if (current?.valueAsNumber == null) return
		if (current.valueAsNumber + addQuant === 0)
			return removeCart(product.idProduct)

		if (
			current.valueAsNumber + addQuant >= 1 &&
			current.valueAsNumber + addQuant <= MAX_QUANTITY_PRODUCTCART
		)
			addCart(product, addQuant)
	}, 150)

	return (
		<div className='flex flex-col justify-center items-center px-2'>
			<Arrow
				className='rotate-90 bg-transparent !w-10 hover:scale-125'
				onClick={() => controlQuantity(1)}
			/>
			<input
				ref={inputRef}
				type='number'
				max={MAX_QUANTITY_PRODUCTCART}
				min={1}
				defaultValue={quantity}
				key={quantity}
				readOnly
				// hack to make the defaultValue change since the normal value throws an error
				className='px-1 py-2 w-8 text-center bg-mainPalette-darkBrown1 rounded'
			/>
			<Arrow
				className='-rotate-90 bg-transparent !w-10 hover:scale-125'
				onClick={() => controlQuantity(-1)}
			/>
		</div>
	)
}
