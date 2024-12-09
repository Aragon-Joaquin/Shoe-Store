import { useNavigate } from 'react-router-dom'
import { Button } from '../../Components'

export default function Error404() {
	const navigate = useNavigate()
	return (
		<section className="flex flex-col justify-center items-center gap-y-2 absolute inset-0">
			<h2 className="text-3xl font-semibold">
				Oops! <strong className="underline font-bold">404 Page</strong> not found.
			</h2>
			<p>
				The pathname &quot;<strong>{window.location.pathname}</strong>&quot; is not correct.
			</p>
			<Button onClick={() => navigate('/')} type="button" className="mt-2 w-28">
				Go home
			</Button>
		</section>
	)
}
