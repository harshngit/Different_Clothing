'use client';
import Link from 'next/link';
import React, { useState } from 'react';
// const panels = [
// 	{
// 		label: 'FOR HIM',
// 		image: '/asset/Shop/banner1.png',
// 	},
// 	{
// 		label: 'FOR HER',
// 		image: '/asset/Shop/banner2.png',
// 	},
// 	{
// 		label: 'ARABIC',
// 		image: '/asset/Shop/banner3.png',
// 	},
// 	{
// 		label: 'SIGNATURE',
// 		image: '/asset/Shop/banner4.png',
// 	},
// ];

export default function ImageAccordion() {
	const [activeIndex, setActiveIndex] = useState(null);

	return (
		<>
			{/* <div className="w-full h-[500px] flex overflow-hidden">
				{panels.map((panel, index) => (
					<div
						key={index}
						onMouseEnter={() => setActiveIndex(index)}
						onMouseLeave={() => setActiveIndex(null)}
						className={`relative flex-1 lg:flex-row flex-col transition-all duration-500 ease-in-out cursor-pointer
            ${activeIndex === index ? 'flex-[3]' : 'flex-[1]'}
          `}
					>
						<img
							src={panel.image}
							alt={panel.label}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition duration-500"></div>
						<div className={`absolute left-5 bottom-[10%] -translate-y-1/2 rotate-[-90deg] origin-left text-white lg:text-xl text-md font-semibold tracking-widest ${activeIndex === index ? 'rotate-[0deg]' : 'rotate-[-90deg]'}`}>
							{panel.label}
						</div>
					</div>
				))}
			</div> */}
			<div
				className="bg-center flex flex-col justify-center items-center bg-no-repeat bg-cover w-full lg:h-[655px] h-[300px]"
				style={{ backgroundImage: `url('/asset/Shop/shopbanner1.png')` }}
			>
				<h2 className=' font-playfair font-extrabold text-[60px] text-[#fff]'>For Him</h2>
				<Link
					href="/forhim"
					className="group relative px-3 py-2 transition text-[18px] block overflow-hidden text-white"
				>
					Explore More
					<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
				</Link>
			</div>
			<div
				className="bg-center flex flex-col justify-center items-center bg-no-repeat bg-cover w-full lg:h-[655px] h-[300px]"
				style={{ backgroundImage: `url('/asset/Shop/shopbanner2.png')` }}
			>
				<h2 className=' font-playfair font-extrabold text-[60px] text-[#fff]'>For Her</h2>
				<Link
					href="/forher"
					className="group relative px-3 py-2 transition text-[18px] block overflow-hidden text-white"
				>
					Explore More
					<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
				</Link>
			</div>
			<div
				className="bg-center flex flex-col justify-center items-center bg-no-repeat bg-cover w-full lg:h-[655px] h-[300px]"
				style={{ backgroundImage: `url('/asset/Shop/shopbanner3.png')` }}
			>
				<h2 className=' font-playfair font-extrabold text-[60px] text-[#fff]'>Signature</h2>
				<Link
					href="/signature"
					className="group relative px-3 py-2 transition text-[18px] block overflow-hidden text-white"
				>
					Explore More
					<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
				</Link>
			</div>
			<div
				className="bg-center flex flex-col justify-center items-center bg-no-repeat bg-cover w-full lg:h-[655px] h-[300px]"
				style={{ backgroundImage: `url('/asset/Shop/shopbanner4.png')` }}
			>
				<h2 className=' font-playfair font-extrabold text-[60px] text-[#fff]'>Arabic</h2>
				<Link
					href="/arabic"
					className="group relative px-3 py-2 transition text-[18px] block overflow-hidden text-white"
				>
					Explore More
					<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
				</Link>
			</div>
		</>
	);
}
