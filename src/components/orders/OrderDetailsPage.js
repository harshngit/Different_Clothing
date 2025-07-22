import React from 'react'
import DetailsOrder from './DetailsOrder'
import CartOrder from './CartOrder'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

const OrderDetailsPage = ({ orderDetails }) => {
	return (
		<>
			<div className='flex justify-start items-center lg:pl-10 px-5 lg:pt-10 py-5'>
				<Link href="/orders">
					<FiArrowLeft className="text-lg" />
				</Link>
			</div>
			<div className='flex justify-center items-center'>
				<h2 className='lg:text-[40px] text-[20px]'>Order Details</h2>
			</div>
			<div className='grid lg:grid-cols-2 gap-[50px] grid-cols-1 lg:px-10 px-5 lg:py-10 py-5 '>
				<div className='border-[2px] px-5 py-5 rounded-lg border-[#000]'>
					<DetailsOrder orderDetails={orderDetails} />
				</div>
				<div className='border-[2px] px-5 py-5 rounded-lg border-[#000]'>
					<CartOrder orderDetails={orderDetails} />
				</div>
			</div>
		</>
	)
}

export default OrderDetailsPage