"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'

const DetailsOrder = ({ orderDetails }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);  // Toggle dropdown visibility
	};
	return (
		<div className='flex justify-start items-start gap-2'>
			<div className='flex flex-col w-[80%] justify-start items-start lg:gap-2 gap-5'>

				<div className='flex justify-start items-start'>
					<h2 className='lg:text-[20px]'>
						Order ID : {orderDetails?.OrderID}
					</h2>
				</div>
				<div className='flex justify-start items-start flex-col lg:gap-2 gap-5'>
					<div className="flex justify-start items-start">
						<h2 className='lg:text-[20px]'>
							Customer Name: {orderDetails?.customerName}
						</h2>
					</div>
					<div className="flex justify-start items-start flex-col">
						<h2 className='lg:text-[20px]'>
							Drop Location:
						</h2>
						<p>{orderDetails?.dropoff_location?.address},</p>
						<p>{orderDetails?.dropoff_location?.city},{orderDetails?.dropoff_location?.region},</p>
						<p>{orderDetails?.dropoff_location?.zip},</p>
					</div>
					<div className="flex justify-start items-start">
						<h2 className='lg:text-[20px]'>
							Phone Number: {orderDetails?.phone}
						</h2>
					</div>
				</div>
				{(orderDetails?.status === "unfulfilled" || orderDetails?.status === "Shipped") && (
					<button className="bg-red-100 hover:bg-red-500 transition-all w-[] duration-500 hover:text-white text-red text-sm px-4 py-2 rounded-md w-[50%]">
						Cancel Order
					</button>
				)}

				{orderDetails?.status === "Delivered" && (
					<Link href={`/return/${orderDetails?.OrderID}`}>
						<button className="bg-black hover:bg-gray-500 transition-all duration-500 hover:text-black text-white text-sm px-4 py-2 rounded-md w-[50%]">
							Return
						</button>
					</Link>
				)}

				{orderDetails?.status === "Processing" && (
					<>
						<button
							className="bg-black hover:bg-gray-500 transition-all duration-500 hover:text-black text-white text-sm px-4 py-2 rounded-md w-[50%]"
							onClick={toggleDropdown}
						>
							Check Return Request
						</button>
					</>
				)}



				{showDropdown && (
					<div className="mt-5 w-full flex flex-col justify-start items-start">

						<div className=''>
							<h4>
								Return Id: #{orderDetails?.returnId}
							</h4>
						</div>
						<div className=''>
							<h4>
								Return Reason: {orderDetails?.returnReason}
							</h4>
						</div>
						<div className='flex mt-5 justify-start items-start gap-2'>
							{orderDetails?.returnImages?.map((item, index) => (
								<img key={index} src={item} className='w-[100px] h-[100px] rounded-lg' alt="" />
							))}
						</div>

					</div>
				)}
			</div>
			<div className='bg-[#000] text-white text-center px-2 py-2 rounded-lg lg:text-[15px] text-[10px] w-[20%]'>
				{orderDetails?.status}
			</div>

		</div>
	)
}

export default DetailsOrder