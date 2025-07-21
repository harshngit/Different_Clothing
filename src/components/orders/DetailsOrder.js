import Link from 'next/link'
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

const DetailsOrder = ({ orderDetails }) => {
	return (
		<div className='flex justify-start items-start gap-2'>
			<div className='flex flex-col w-[80%] justify-start items-start lg:gap-2 gap-5'>
				<Link href="/">
					<FiArrowLeft className="text-lg" />
				</Link>
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
				<Link href={`/return/${orderDetails?.OrderID}`}>
					<button className='bg-black hover:bg-gray-500 transition-all duration-500 hover:text-[#000] text-white text-sm px-4 py-2 rounded-md'>
						Return
					</button>
				</Link>
			</div>
			<div className='bg-[#000] text-white text-center px-2 py-2 rounded-lg lg:text-[15px] text-[10px] w-[20%]'>
				{orderDetails?.status}
			</div>
		</div>
	)
}

export default DetailsOrder