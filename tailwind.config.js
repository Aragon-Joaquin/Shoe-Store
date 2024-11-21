/** @type {import('tailwindcss').Config} */

/**
 * @param {string} image just the image name thats in the "assets/images" folder with the extension, for example: 'photo1.png', 'myDog.jpg'
 * @returns {string} the relative path to the image.
 */

//! important: Remember to compress your images correctly!
const shortUrlPathImages = (image) => `./src/assets/images/${image}`

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

	theme: {
		extend: {
			colors: {
				customBrown: {
					colorPrimary: '#844a32',
					colorSecondary: '#581b13',
					colorTerciary: '#332021'
				},
				mainPalette: {
					darkBrown1: '#382626', //! why did i think it was a good idea work with brown
					darkBrown2: '#322222',
					darkBrown3: '#170e00',
					softBrown1: '#4b3b3b',
					softBrown2: '#5f5151',
					softWhite: '#ebe9e9'
				}
			},

			backgroundImage: {
				ladingPageCover: `url(${shortUrlPathImages('landingPageCover.webp')})`
			},
			gridTemplateColumns: {
				'auto-fill-productCol': 'repeat(auto-fill, minmax(200px, 1fr))'
			},
			boxShadow: {
				['inner-xl']: '25px 0px 20px -20px rgba(0,0,0,0.5) inset, -25px 0px 20px -20px rgba(0,0,0,0.5) inset',
				['top']: 'rgba(0, 0, 0, 0.5) 0px -6px 6px -6px'
			}
		}
	},
	plugins: []
}
