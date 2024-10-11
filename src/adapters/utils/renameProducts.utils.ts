import { productInformation } from '../../models/product.interface'

export function renameProducts(product: productInformation) {
	const {
		idProduct,
		productTitle,
		productType,
		productShortDescription,
		productLongDescription,
		productDetails,
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
		sizes: productSizes,
		colors: productColors,
		price: productPrice,
		tags: productTags,
		images: productImages
	}
}
