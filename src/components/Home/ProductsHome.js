import Image from 'next/image'
import React from 'react'
import img from '../../../public/asset/Home/abouthome2.png'
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from 'next/link';
import SwiperCollection from './SwiperCollection';
const ProductsHome = () => {
	return (
		<div className='w-full lg:h-auto bg-white lg:py-10 lg:px-20 py-5 px-5'>
			<div className='flex flex-col justify-center items-center pt-10 '>
				{/* <div className='w-[100px] h-2 rounded-lg bg-[#D9D9D933] hidden lg:block'></div> */}
				<h2 className='lg:text-[32px] font-light text-[40px] text-center text-[#000]'>Where style meets expression</h2>
				<h3 className='lg:text-[24px] font-light text-[40px] text-center text-[#000]'>Step into fashion</h3>
				<div className='bg-[#D9D9D9] px-5 py-2 mt-5 rounded-2xl flex gap-3 justify-center items-center'>
					<h3>New Colection</h3>
					<Link href="">
						<div className='bg-black px-1 py-1 rounded-full text-white'>
							<IoIosArrowRoundForward className='text-[20px]' />
						</div>
					</Link>
				</div>
				{/* <div className='w-[100px] h-2 rounded-lg bg-[#D9D9D933] hidden lg:block'></div> */}
			</div>
			{/* <div className='grid lg:grid-cols-3 grid-cols-1 mt-7 gap-10	'>
				<div className='lg:w-[386px] lg:h-[438px] bg-white py-5 px-5 rounded-[10px]'>
					<div className='flex justify-center items-center'>
						<Image src={img} width={336} height={244} className='rounded-[10px]' />
					</div>
					<div className='flex justify-between items-center mt-2'>
						<div className='flex justify-start items-start flex-col'>
							<h3 className='text-[20px] font-normal'>shirt1</h3>
							<p className='text-gray-600 text-[12px]'>Al Karam</p>
						</div>
						<div className='flex justify-start items-start'>
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
						</div>
					</div>
					<div className='flex justify-start items-start mt-2'>
						<h4 className='text-[20px] text-black'>(4.1k) Customer Reviews</h4>
					</div>
					<div className='flex justify-between items-start mt-2'>
						<h4 className='text-[18px] text-black'>$95.50</h4>
						<p className='text-[15px] text-[#FF4646] '>Almost Sold Out</p>
					</div>
				</div>
				<div className='lg:w-[386px] lg:h-[438px] bg-white py-5 px-5 rounded-[10px]'>
					<div className='flex justify-center items-center'>
						<Image src={img} width={336} height={244} className='rounded-[10px]' />
					</div>
					<div className='flex justify-between items-center mt-2'>
						<div className='flex justify-start items-start flex-col'>
							<h3 className='text-[20px] font-normal'>shirt1</h3>
							<p className='text-gray-600 text-[12px]'>Al Karam</p>
						</div>
						<div className='flex justify-start items-start'>
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
						</div>
					</div>
					<div className='flex justify-start items-start mt-2'>
						<h4 className='text-[20px] text-black'>(4.1k) Customer Reviews</h4>
					</div>
					<div className='flex justify-between items-start mt-2'>
						<h4 className='text-[18px] text-black'>$95.50</h4>
						<p className='text-[15px] text-[#FF4646] '>Almost Sold Out</p>
					</div>
				</div>
				<div className='lg:w-[386px] lg:h-[438px] bg-white py-5 px-5 rounded-[10px]'>
					<div className='flex justify-center items-center'>
						<Image src={img} width={336} height={244} className='rounded-[10px]' />
					</div>
					<div className='flex justify-between items-center mt-2'>
						<div className='flex justify-start items-start flex-col'>
							<h3 className='text-[20px] font-normal'>shirt1</h3>
							<p className='text-gray-600 text-[12px]'>Al Karam</p>
						</div>
						<div className='flex justify-start items-start'>
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
						</div>
					</div>
					<div className='flex justify-start items-start mt-2'>
						<h4 className='text-[20px] text-black'>(4.1k) Customer Reviews</h4>
					</div>
					<div className='flex justify-between items-start mt-2'>
						<h4 className='text-[18px] text-black'>$95.50</h4>
						<p className='text-[15px] text-[#FF4646] '>Almost Sold Out</p>
					</div>
				</div>
				<div className='lg:w-[386px] lg:h-[438px] bg-white py-5 px-5 rounded-[10px]'>
					<div className='flex justify-center items-center'>
						<Image src={img} width={336} height={244} className='rounded-[10px]' />
					</div>
					<div className='flex justify-between items-center mt-2'>
						<div className='flex justify-start items-start flex-col'>
							<h3 className='text-[20px] font-normal'>shirt1</h3>
							<p className='text-gray-600 text-[12px]'>Al Karam</p>
						</div>
						<div className='flex justify-start items-start'>
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
						</div>
					</div>
					<div className='flex justify-start items-start mt-2'>
						<h4 className='text-[20px] text-black'>(4.1k) Customer Reviews</h4>
					</div>
					<div className='flex justify-between items-start mt-2'>
						<h4 className='text-[18px] text-black'>$95.50</h4>
						<p className='text-[15px] text-[#FF4646] '>Almost Sold Out</p>
					</div>
				</div>
				<div className='lg:w-[386px] lg:h-[438px] bg-white py-5 px-5 rounded-[10px]'>
					<div className='flex justify-center items-center'>
						<Image src={img} width={336} height={244} className='rounded-[10px]' />
					</div>
					<div className='flex justify-between items-center mt-2'>
						<div className='flex justify-start items-start flex-col'>
							<h3 className='text-[20px] font-normal'>shirt1</h3>
							<p className='text-gray-600 text-[12px]'>Al Karam</p>
						</div>
						<div className='flex justify-start items-start'>
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
						</div>
					</div>
					<div className='flex justify-start items-start mt-2'>
						<h4 className='text-[20px] text-black'>(4.1k) Customer Reviews</h4>
					</div>
					<div className='flex justify-between items-start mt-2'>
						<h4 className='text-[18px] text-black'>$95.50</h4>
						<p className='text-[15px] text-[#FF4646] '>Almost Sold Out</p>
					</div>
				</div>
				<div className='lg:w-[386px] lg:h-[438px] bg-white py-5 px-5 rounded-[10px]'>
					<div className='flex justify-center items-center'>
						<Image src={img} width={336} height={244} className='rounded-[10px]' />
					</div>
					<div className='flex justify-between items-center mt-2'>
						<div className='flex justify-start items-start flex-col'>
							<h3 className='text-[20px] font-normal'>shirt1</h3>
							<p className='text-gray-600 text-[12px]'>Al Karam</p>
						</div>
						<div className='flex justify-start items-start'>
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
							<FaStar className='w-5 text-[#FCA120]' />
						</div>
					</div>
					<div className='flex justify-start items-start mt-2'>
						<h4 className='text-[20px] text-black'>(4.1k) Customer Reviews</h4>
					</div>
					<div className='flex justify-between items-start mt-2'>
						<h4 className='text-[18px] text-black'>$95.50</h4>
						<p className='text-[15px] text-[#FF4646] '>Almost Sold Out</p>
					</div>
				</div>
			</div> */}
			{/* Slider */}
			<div className='mt-10'>
				<SwiperCollection />
			</div>
		</div>
	)
}

export default ProductsHome