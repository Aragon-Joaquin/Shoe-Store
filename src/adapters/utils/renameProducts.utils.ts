import { API_RESPONSE } from '../../models/product.interface'

export function renameProducts(product: API_RESPONSE) {
	const {
		idProduct,
		productTitle,
		productType,
		productShortDescription,
		productLongDescription,
		productDetails,
		productManufacturer,
		productSizes,
		productColors,
		productPrice,
		productTags,
		productImages
	} = product

	return {
		idProduct: idProduct,
		title: productTitle,
		type: productType,
		shortDesc: productShortDescription,
		longDesc: productLongDescription,
		details: productDetails,
		manufacturer: productManufacturer,
		sizes: productSizes,
		colors: productColors,
		price: productPrice,
		tags: productTags,
		images: productImages,
		quantityInCart: 0
	}
}
