import { Truck } from '../../../assets'
import { Title } from '../../../Components'

const SERVICES_SECTION = [
	{
		logoPath: '@assets/Truck.svg.tsx',
		sectionInformation: 'We make the best deliveries!'
	},
	{
		logoPath: '@assets/Truck.svg.tsx',
		sectionInformation: 'Best quality.'
	},
	{
		logoPath: '@assets/Truck.svg.tsx',
		sectionInformation: '1 year guarantee.'
	},
	{
		logoPath: '@assets/Truck.svg.tsx',
		sectionInformation: 'Made with 100% leather.'
	}
] as const

//! add dynamic import to SVGs
export default function ProductServices() {
	return (
		<div className="flex justify-center m-auto items-center flex-col border-[3px] border-mainPalette-softBrown2 max-w-[75%] rounded-t-2xl rounded-b-md">
			<Title className="!py-4 border-b-[3px] border-b-mainPalette-softBrown2 w-full flex justify-center">
				Why choosing us?
			</Title>
			<ul className="grid grid-cols-4 grid-rows-1 divide-x-2 divide-neutral-300/20 w-full">
				{SERVICES_SECTION.map((service) => {
					return (
						<li key={service.sectionInformation} className="flex flex-col items-center p-4 gap-y-2 text-center text-lg">
							<Truck className="w-10 h-auto" />
							<p>{service.sectionInformation}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
