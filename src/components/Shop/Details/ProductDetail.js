import React from 'react'
import LightBox from './LightBox'
import Details from './Details'
import NewDetail from './NewDetail'

const ProductDetail = ({ productDetails }) => {
	return (
		<div className='px-5 py-5'>
			<div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-2'>
				{/* Sticky Lightbox on large screens */}
				<div className="col-span-2 lg:h-[100vh] lg:overflow-y-scroll scrollbar-hide">
					<LightBox productDetails={productDetails} />
				</div>

				{/* Scrollable Details */}
				<div className='col-span-1 '>
					{/* <NewDetail productDetails={productDetails} /> */}
					<Details productDetails={productDetails} />
				</div>
			</div>
		</div>
	)
}

export default ProductDetail