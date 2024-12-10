import { Route } from '../../../Components'

export interface singleContent {
	contentName: string
	url?: string
	providedInformation?: string
}

export function FooterMore({ sectionName, contents }: { sectionName: string; contents: Array<singleContent> }) {
	return (
		<div className="text-center w-full md:w-fit">
			<span className="text-lg font-bold m-auto underline underline-offset-2">{sectionName}</span>
			<ul className="mt-2">
				{contents.map((element) => {
					return (
						<li key={element.contentName} className="flex flex-row justify-center items-center">
							{element?.url ? (
								<Route
									typeOfStyling="anchor"
									anchorURL={`/${element.url === '/' ? '' : element.url}`}
									// just to redirect to landing page
									className="text-white/85 w-full text-center"
								>
									{element.contentName}
								</Route>
							) : (
								<span className="md:text-center">{element.contentName}</span>
							)}

							{element?.providedInformation && (
								<p className="font-bold ml-2 text-pretty md:h-full">{element.providedInformation}</p>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
