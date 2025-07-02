import Link from 'next/link'
import React from 'react'

const Photosection = () => {
	return (
		<div className='lg:pt-[1%] pt-[20px]  flex justify-center lg:flex-row flex-col items-center'>
			<div className='lg:w-[50%] w-full relative'>
				<img
					src="/asset/Home/3.png"
					alt="look1"
					className="w-full lg:h-[91.5vh] object-cover"
				/>
				<h2 className='font-500 group font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3 '>SIGNATURE
				</h2>
				<Link href={'/signature'}>
					<h2 className='font-500 group font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE
						<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" /></h2>
				</Link>
			</div>
			<div className='lg:w-[50%] w-full relative'>
				<img
					src="/asset/Home/4.png"
					alt="look1"
					className="w-full lg:h-[91.5vh] object-cover"
				/>
				<h2 className='font-500 group font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>ARABIC
				</h2>
				<Link href={'/arabic'}>
					<h2 className='font-500 group font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE
						<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" /></h2>
				</Link>
			</div>
		</div>
	)
}

export default Photosection