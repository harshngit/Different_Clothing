import { Input, Select, Option, Radio } from '@material-tailwind/react'
import React from 'react'

const CheckoutForm = () => {
	return (
		<div className='lg:h-[100vh] h-auto overflow-y-scroll'>
			<div className="max-w-lg mx-auto px-4 py-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Contact</h2>
				</div>

				{/* Email Input */}
				<Input
					type="email"
					placeholder="Enter Your Email"
					label="Email"
					className="mb-4"
				/>
			</div>
			<div className="max-w-lg mx-auto px-4 py-6  rounded-md">
				<h2 className="text-xl font-bold mb-4">Delivery</h2>

				{/* Country */}
				<div className="mb-4">
					<label className="text-sm font-medium text-gray-700 mb-1 block">Country/Region</label>
					<Select label="Country/Region">
						<Option value="India">India</Option>
						<Option value="USA">USA</Option>
					</Select>
				</div>

				{/* Name Fields */}
				<div className="flex gap-4 mb-4">
					<Input label="First name (optional)" className="w-full" />
					<Input label="Last name" className="w-full" />
				</div>

				{/* Address */}
				<div className='flex justify-center flex-col items-center mb-4 gap-5'>
					<Input label="Address" className="mb-4" />

					{/* Apartment */}
					<Input label="Apartment, suite, etc." className="mb-4 mt-" />
				</div>

				{/* City, State, Pincode */}
				<div className="flex gap-4 mb-4">
					<div className='w-1/2'><Input label="City" className="w-full" /></div>

					<div className='w-1/2'><Select label="State" className="">
						<Option>Maharashtra</Option>
						<Option>Delhi</Option>
						<Option>Gujarat</Option>
					</Select></div>
				</div>

				{/* Phone */}
				<Input label="Phone" className="mb-4" />


			</div>
			<div className="max-w-lg mx-auto px-4 py-6  rounded-md">
				<h2 className="text-xl font-bold ">Payment Methods</h2>
				<p className='text-sm font-light mb-4'>All transactions are secure and encrypted.</p>
				<Radio defaultChecked={true} value="cod" label="COD (Cash On Delivery)" />
			</div>
			<div className="max-w-lg mx-auto px-4 py-6">
				<button className='bg-black px-5 text-white py-2'>Place Order</button>
			</div>
		</div>
	)
}

export default CheckoutForm