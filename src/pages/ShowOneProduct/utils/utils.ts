//@ts-expect-error: this is a dynamic import from vite.config
import portraitShoe from '@images/portraitShoe.webp'
import { productsImages } from '../../../models'
export const imageOnError = () => portraitShoe

export type changeImage = {
	image?: productsImages
	currentImageFocus?: number
}
