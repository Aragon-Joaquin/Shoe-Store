import { Route } from '../../../Components'

export interface singleContent {
	contentName: string
	url?: string
	providedInformation?: string
}

export function FooterMore({ sectionName, contents }: { sectionName: string; contents: Array<singleContent> }) {
	return (
		<div className="">
			<span className="text-xl font-bold">{sectionName}</span>
			<ul className="mt-4">
				{contents.map((element) => {
					return (
						<li key={element.contentName} className="flex flex-row">
							<span>
								{element?.url ? (
									<Route
										typeOfStyling="anchor"
										anchorURL={`/${element.url === '/' ? '' : element.url}`}
										// just to redirect to landing page
										className="text-white/85"
									>
										{element.contentName}
									</Route>
								) : (
									element.contentName
								)}
							</span>
							{element?.providedInformation && <p className="font-bold ml-2">{element.providedInformation}</p>}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
