import React from 'react'
import LightBox from './LightBox'
import Details from './Details'

const ProductDetail = ({ productDetails }) => {
	return (
		<div className='px-5 py-5 '>
			<div className='grid lg:grid-cols-2 grid-cols-1'>
				{/* lightbox */}
				<div>
					<LightBox productDetails={productDetails} />
				</div>
				<div>
					<Details productDetails={productDetails} />
				</div>
			</div>
		</div>
	)
}

export default ProductDetail