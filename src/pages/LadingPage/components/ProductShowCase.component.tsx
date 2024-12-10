import { Route } from '../../../Components'

interface ShowCaseParams {
	URL: string
	Title: string
	Description: string
	//imageSrc: `${string}.png` //? maybe but not for now
	imageSrc: string
	isInverted: boolean
}

//todo: maybe i can use a <Product /> instead of typing everything again
export default function ProductShowCase({ URL, Title, Description, imageSrc, isInverted }: ShowCaseParams) {
	const pathInverted = isInverted ? 'before:ccInverted_bgPortrait' : 'before:cc_bgPortrait'
	return (
		<section
			className={`${pathInverted} before:content-[''] before:w-full before:h-full before:absolute before:bg-[#170e00] before:inset-0 before:-z-10
		 ${isInverted ? 'flex-row-reverse' : 'flex-row'} flex justify-around xl:justify-center h-96`}
		>
			{imageSrc != '' && (
				<img
					src={imageSrc}
					className=" flex-1 object-contain aspect-square md:flex-none md:object-cover md:w-96 h-auto brightness-90 drop-shadow-xl transition-all cursor-pointer select-none hover:scale-110"
				/>
			)}
			<div className="flex-1 mt-20 flex flex-col lg:flex-none items-center w-fit">
				<h4 className="text-2xl md:text-3xl font-bold mb-0.5 md:mb-2">{Title}</h4>
				<p className="max-w-2xl mx-2 text-center max-h-40 overflow-y-auto text-ellipsis text-wrap bg-mainPalette-darkBrown1/20 p-2 rounded-lg">
					{Description}
				</p>
				{Title != '' && (
					<Route
						anchorURL={`/${URL}`}
						typeOfStyling="button"
						className="mt-5 text-lg border-customBrown-colorPrimary border-2 rounded-md px-2 py-1 cursor-pointer z-20"
					>
						Check them out
					</Route>
				)}
			</div>
		</section>
	)
}
