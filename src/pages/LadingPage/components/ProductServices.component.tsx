import { Truck } from '../../../assets'
import { Title } from '../../../Components'

const SERVICES_SECTION = [
	{
		logoPath: '',
		sectionInformation: 'We make the best deliveries!'
	},
	{
		logoPath: '',
		sectionInformation: 'Best quality.'
	},
	{
		logoPath: '',
		sectionInformation: '1 year guarantee.'
	},
	{
		logoPath: '',
		sectionInformation: 'Made with 100% leather.'
	}
] as const

//! add dynamic import to SVGs
export default function ProductServices() {
	return (
		<div className=" w-3/4 m-auto md:w-3/4 xl:w-1/2 flex justify-center md:m-auto items-center flex-col border-[3px] border-mainPalette-softBrown2 rounded-t-2xl rounded-b-md">
			<Title className="!py-4 border-b-[3px] border-b-mainPalette-softBrown2 w-full flex justify-center text-pretty">
				Why choosing us?
			</Title>
			<ul className="grid grid-cols-1 grid-rows-4 divide-y-2 divide-neutral-300/20 w-full sm:grid-cols-4 sm:grid-rows-1 sm:divide-y-0 sm:divide-x-2">
				{SERVICES_SECTION.map((service) => {
					return (
						<li key={service.sectionInformation} className="flex flex-col items-center p-4 gap-y-2 text-center text-lg">
							<Truck className="w-10 h-auto" />
							<p className="text-center">{service.sectionInformation}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
