import React, { useEffect, useState } from 'react'

const LightBox = ({ productDetails }) => {
	const productImages = productDetails?.productImages || [];
	const variationImages = productDetails?.variation?.map(v => v.img) || [];

	const allImages = [...productImages, ...variationImages];
	const [selectedImage, setSelectedImage] = useState(allImages[0] || '');

	useEffect(() => {
		if (allImages.length > 0) {
			setSelectedImage(allImages[0]);
		}
	}, [productDetails]);
	return (
		<div className='flex flex-col-reverse md:flex-row gap-10 items-center justify-center'>
			<div className="flex justify-center items-center md:flex-col gap-4">
				{allImages.map((img, index) => (
					<img
						key={index}
						src={img}
						alt={`Thumbnail ${index}`}
						onClick={() => setSelectedImage(img)}
						className={`w-16 object-cover cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-300"
							}`}
					/>
				))}
			</div>
			<div className="w-full max-w-md">
				{selectedImage && (
					<img
						src={selectedImage}
						alt="Selected"
						className="w-full lg:h-[500px] h-[400px] object-cover rounded"
					/>
				)}
			</div>
		</div>
	)
}

export default LightBox