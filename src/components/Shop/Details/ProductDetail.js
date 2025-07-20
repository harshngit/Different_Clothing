import React from 'react'
import LightBox from './LightBox'
import Details from './Details'
import NewDetail from './NewDetail'

const ProductDetail = ({ productDetails }) => {
	return (
		<div className='px-5 py-5'>
			<div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-2'>
				{/* Sticky Lightbox on large screens */}
				<div className="col-span-2 lg:h-[80vh] lg:overflow-y-scroll scrollbar-hide">
					<LightBox productDetails={productDetails} />
				</div>

				{/* Scrollable Details */}
				<div className='col-span-1 '>
					{/* <NewDetail productDetails={productDetails} /> */}
					<Details productDetails={productDetails} />
				</div>
			</div>
			<div className='lg:grid hidden lg:grid-cols-3 gap-5 mt-5'>
				<div className='flex flex-col gap-2 items-start'>
					<h2 className='font-thin lg:text-[20px] text-[15px]'>Product Description</h2>
					<p>{(productDetails?.productDescription || "").replace(/<[^>]+>/g, "")}</p>
				</div>

				<div className='flex flex-col gap-2 items-start'>
					<h2 className='font-thin lg:text-[20px] text-[15px]'>Materials</h2>
					<p>{(productDetails?.productMaterial || "").replace(/<[^>]+>/g, "")}</p>
				</div>

				<div className='flex flex-col gap-2 items-start'>
					<h2 className='font-thin lg:text-[20px] text-[15px]'>Delivery & Payment</h2>
					<p>{(productDetails?.productDeliveryPayment || "").replace(/<[^>]+>/g, "")}</p>
				</div>
			</div>

		</div>
	)
}

export default ProductDetail