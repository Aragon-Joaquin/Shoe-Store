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

const CONTANCT_US: Array<singleContent> = [
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
		<footer className='bg-black/90 mt-10 py-10 border-t-2 border-t-slate-300/50'>
			<div className='flex flex-row justify-around items-start'>
				<AppLogo titleclassName='h-full vertical my-auto hover:scale-110 transition-all' />
				<FooterMore
					sectionName='Learn More'
					contents={MORE_INFORMATION}
				/>
				<FooterMore sectionName='Contact Us' contents={CONTANCT_US} />
				<FooterMore sectionName='Socials' contents={SOCIALS} />
			</div>

			<span
				className="mt-10 relative flex justify-center
            before:content-[''] before:w-9/12 before:h-full before:absolute before:-top-5 before:border-t-2 before:border-t-mainPalette-softWhite/50 "
			>
				© Lorem Ipsum 20XX | All Rights Reserved
			</span>
		</footer>
	)
}
