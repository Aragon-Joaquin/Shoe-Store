interface InputParams {
	className?: string
	InputType: 'range' | 'text' | 'search' | 'submit'
	PlaceHolderText: string
}

export function Input({ className, InputType, PlaceHolderText }: InputParams) {
	return (
		<>
			<input
				type={InputType}
				placeholder={PlaceHolderText}
				className={`rounded-e-xl rounded-lg p-1 pl-2 border-gray-500/50 border-solid border-2 ${className}`}
			></input>
		</>
	)
}
