"use client"

import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import CountdownTimer from './CountdownTimer'
import ImageSlider from './ImageSlider'
import SimpleSlider from './SimpleSwiper'
import allProducts from '@/data/ProductData'
import Link from 'next/link'

const Deal = ({ productList = [] }) => {
	const [liked, setLiked] = useState(false);

	const handleToggle = (productId) => {
		setLiked((prev) => ({
			...prev,
			[productId]: !prev[productId],
		}));
	};
	return (
		<div className='bg-white w-full lg:h-screen h-auto pt-10'>
			{/* <div className='flex justify-start items-start flex-col lg:flex-row'>
				<div className='lg:w-[40%] w-full flex justify-start items-start flex-col gap-10'>
					<div className='flex flex-col gap-10'>
						<h2 className='lg:text-[46px] text-[30px] font-normal text-[#484848]'>Deals Of The Month</h2>
						<p className='font-normal text-[#8A8A8A] text-[16px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
					</div>
					<div className='flex justify-start items-start w-full'>
						<Button className='py-[15px] px-[20px] w-[50%] shadow-[#000] shadow-sm text-[16px]'>Buy Now</Button>
					</div>
					<div className='flex justify-start items-start flex-col gap-10'>
						<h2 className='lg:text-[28px] text-[18px] font-normal'>Hurry, Before It’s Too Late!</h2>
						<CountdownTimer />
					</div>
				</div>
				<div className='lg:w-[60%] w-full gap-10 lg:block hidden'>
					<ImageSlider />
				</div>
				<div className='lg:w-[60%] w-full gap-10 block lg:hidden'>
					<SimpleSlider />
				</div>
			</div> */}
			<div className='lg:py-5 py-5 px-5 lg:px-10 flex justify-between items-center'>
				<h2 className='font-bold font-playfair lg:text-[32px] text-[18px]'>TRENDING NOW</h2>
				<Link href="/shop" className='font-normal group relative font-playfair lg:text-[20px] text-[15px]'>EXPLORE MORE
					<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
				</Link>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-4 font-playfair">
				{productList.map((product) => (
					<Link href={`shop/${product.id}`}>
						<div key={product.id} className="bg-white overflow-hidden group">
							<div className="relative">
								{/* Product Image (Hover effect) */}
								<div >
									<img
										src={product.productImages?.[0]} // main image
										alt={product.title}
										className="w-full lg:h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-0"
									/>

									<img
										src={product.productImages?.[1]} // hover image
										alt={`${product.title} hover`}
										className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
									/>

								</div>
							</div>

							{/* Product Info */}
							<div className="p-3 flex justify-between items-start">
								<div className='flex flex-col gap-2 justify-start items-start'>
									<div>
										<p className='text-black lg:text-[15px] text-[10px]'>{product?.productCategory}</p>
										<Link href={`shop/${product.id}`}><h3 className="lg:text-[20px] text-[12px] font-semibold">{product.productName}</h3></Link>
										<p className="text-gray-700 font-bold lg:-text-[15px] text-[12px]">${product.productPrice}</p>
									</div>
									{
										product.variation.map((item) => (
											<div className="flex justify-center items-center gap-2">
												<div className={`w-5 h-5 rounded-full border border-black`} style={{ backgroundColor: item.color }}></div>
											</div>
										))
									}
								</div>
								<button onClick={(e) => {
									e.preventDefault(); // Prevent Link navigation on button click
									handleToggle(product.id);
								}}>
									<img
										src={liked[product.id] ? '/asset/heartred.png' : '/asset/heart.png'}
										alt="heart icon"
										className="w-6 h-6"
									/>
								</button>
							</div>
						</div>
					</Link>

				))}
			</div>
		</div>
	)
}

export default Deal