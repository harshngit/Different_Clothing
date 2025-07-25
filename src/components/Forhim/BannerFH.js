import React from 'react'

const BannerFH = ({ title, desc }) => {
	return (
		<div className='w-full flex justify-center items-center px-10 py-10 flex-col'>
			<h2 className='font-bold font-playfair lg:text-[100px] text-[50px]'>{title}</h2>
			<p className='lg:w-[60%] w-[80%] text-center text-[#565449] font-normal font-playfair lg:text-[16px]'>{desc}</p>
		</div>
	)
}

export default BannerFH