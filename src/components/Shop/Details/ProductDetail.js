import React from 'react'
import LightBox from './LightBox'

const ProductDetail = () => {
	return (
		<div className='px-10 py-5 '>
			<div className='grid lg:grid-cols-2 grid-cols-1'>
				{/* lightbox */}
				<div>
					<LightBox />
				</div>
			</div>
		</div>
	)
}

export default ProductDetail