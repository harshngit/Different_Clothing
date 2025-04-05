import Image from 'next/image'
import React from 'react'

const AboutHome = () => {
	return (
		<section className=" w-full lg:h-[130vh] bg-primary lg:py-10 lg:px-20 py-5 px-5">
			<div className="lg:block hidden absolute left-[-100px] top-[1000px] -translate-y-1/2 w-[200px] h-[200px] bg-[#4D4B42] rounded-full"></div>

			{/* Right Semi-circle */}
			<div className="lg:block hidden absolute right-[-100px] top-[1200px] -translate-y-1/2 w-[200px] h-[200px] bg-[#4D4B42] rounded-full"></div>
			<div className='flex justify-center items-center flex-col lg:flex-row'>
				<div className='flex justify-center items-start lg:w-[60%] w-full flex-col'>
					<h2 className='lg:text-[64px] text-[20px] font-normal text-[#D8D8D8]'>Change</h2>
					<h1 className='lg:text-[94px] text-[30px] font-normal text-[#fff]'>Your Style</h1>
				</div>
				<div className='flex justify-start items-center lg:w-[40%] w-full'>
					<p className='lg:text-right text-white font-normal lg:text-[24px] text-[15px]'>
						Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style.
					</p>
				</div>
			</div>
			<div className=" hidden lg:flex flex-col md:flex-row items-center justify-center relative">
				{/* Left Image */}
				<div className="rounded-[30px] overflow-hidden absolute left-[180px] top-[50px] ">
					<Image
						src="/asset/Home/abouthome1.png"
						alt="look1"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				{/* Center Image */}
				<div className="rounded-[30px] overflow-hidden absolute z-20 top-[190px] left-[450px] ">
					<Image
						src="/asset/Home/abouthome2.png"
						alt="look2"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				{/* Right Image */}
				<div className="rounded-[30px] overflow-hidden absolute top-[250px]  z-10 right-[150px] ">
					<Image
						src="/asset/Home/abouthome1.png"
						alt="look3"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>
			</div>
			<div className='lg:hidden grid grid-flow-row grid-row-3 mt-5 gap-10'>
				<div className="rounded-[30px] overflow-hidden ">
					<Image
						src="/asset/Home/abouthome1.png"
						alt="look1"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				{/* Center Image */}
				<div className="rounded-[30px] overflow-hidden">
					<Image
						src="/asset/Home/abouthome2.png"
						alt="look2"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				{/* Right Image */}
				<div className="rounded-[30px] overflow-hidden ">
					<Image
						src="/asset/Home/abouthome1.png"
						alt="look3"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>
			</div>
		</section>
	)
}

export default AboutHome