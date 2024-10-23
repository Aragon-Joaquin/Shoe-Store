import { Button, Title } from '../../Components/index.tsx'
import { APP_NAME, APP_SLOGAN } from '../../utils/constants'

export default function LandingPage() {
	return (
		<>
			<header className="relative cc_clip-path-polygon flex flex-col items-center bg-cover bg-center bg-ladingPageCover">
				<div className="mt-10 mb-16 gap-y-3 p-3 flex flex-col items-center after:rounded-xl after:backdrop-blur-md after:bg-gray-700/30 after:w-full after:h-full after:-z-10 after:inset-0 after:absolute">
					<h2 className="font-bold text-3xl">{APP_NAME}</h2>
					<span className="text-center">{APP_SLOGAN}</span>
					<Button onClick={() => console.log('test')}>See Shoes</Button>
				</div>
			</header>

			<article>
				<section className="flex flex-col justify-center items-center">
					<Title>Lorem ipsum dolor sit.</Title>
					<p className="bg-mainPalette-darkBrown1 max-w-[50%] text-center p-4 border-2 border-mainPalette-softBrown1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, modi! Blanditiis pariatur corporis incidunt
						officia eius placeat culpa voluptate dolore.
					</p>
				</section>
				<section>
					<div>
						<></>
						{/* //* heres go both ProductShowCaseUserOutlineSVG */}
						<></>
					</div>
					<div>
						<h4>What services we offer</h4>
						{/* <SvgInfo />	*/}
					</div>

					<div>{/* <ProductCarrousel />  */}</div>
				</section>
			</article>
		</>
	)
}
