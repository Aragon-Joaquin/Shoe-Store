interface InputParams {
	className?: string
	InputType: 'range' | 'text' | 'search' | 'submit'
	PlaceHolderText: string
	formName?: string
}

export function Input({ className, InputType, PlaceHolderText, formName }: InputParams) {
	return (
		<>
			<input
				type={InputType}
				placeholder={PlaceHolderText}
				className={`rounded-e-xl rounded-lg p-1 pl-2 border-gray-500/50 border-solid border-2 ${className}`}
				name={formName ?? ''}
			></input>
		</>
	)
}
