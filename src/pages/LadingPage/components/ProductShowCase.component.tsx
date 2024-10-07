import Route from '../../../Components/Route.component'

interface ShowCaseParams {
	URL: string
	Title: string
	Description: string
}

//todo: maybe i can use a <Product /> instead of typing everything again
export default function ProductShowCase({ URL, Title, Description }: ShowCaseParams) {
	return (
		<section>
			<img />
			<h4>{Title}</h4>
			<p>{Description}</p>
			<Route anchorURL={URL}>Buy it here!</Route>
		</section>
	)
}
