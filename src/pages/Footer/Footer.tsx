import { AppLogo } from '../../assets'
import { FooterMore, singleContent } from './Components/FooterMore.component'

const MORE_INFORMATION: Array<singleContent> = [
	{
		contentName: 'About us',
		url: ''
	},
	{
		contentName: 'Home',
		url: '/'
	},
	{
		contentName: 'Privacy Policy',
		url: ''
	},
	{
		contentName: 'Contact Us',
		url: ''
	}
] as const

const CONTACT_US: Array<singleContent> = [
	{
		contentName: 'Phone Number: ',
		providedInformation: '+123 456 789'
	},
	{
		contentName: 'Business Location: ',
		providedInformation: 'New York 000 ST. Lorem'
	}
] as const

// add svgs later
const SOCIALS: Array<singleContent> = [
	{
		contentName: 'LinkedIn',
		url: '/'
	},
	{
		contentName: 'Youtube',
		url: '/'
	},
	{
		contentName: 'Instagram',
		url: '/'
	}
] as const

export default function Footer() {
	return (
		<footer className="bg-black/90 mt-10 py-10 border-t-2 border-t-slate-300/50">
			<div className="flex flex-col md:flex-row w-full items-center">
				<AppLogo
					titleClassName="text-nowrap mb-5 md:mb-0 md:ml-5 hover:scale-110 transition-all text-2xl"
					SVGclassName="w-full"
				/>
				<div className="flex flex-col flex-1 md:justify-evenly justify-center items-start gap-y-4 md:flex-row">
					<FooterMore sectionName="Learn More" contents={MORE_INFORMATION} />
					<FooterMore sectionName="Contact Us" contents={CONTACT_US} />
					<FooterMore sectionName="Socials" contents={SOCIALS} />
				</div>
			</div>

			<span
				className="mt-10 relative flex justify-center text-center
            before:content-[''] before:w-9/12 before:h-full before:absolute before:-top-5 before:border-t-2 before:border-t-mainPalette-softWhite/50 "
			>
				© Lorem Ipsum 20XX | All Rights Reserved
			</span>
		</footer>
	)
}
