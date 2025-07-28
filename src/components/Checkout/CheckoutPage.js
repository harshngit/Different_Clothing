import React from 'react'
import CartCheckoutDetails from './CartCheckoutDetails'
import CheckoutForm from './CheckoutForm'
import CartAddress from './CartAddress'

const CheckoutPage = () => {
	return (
		<>

			<div className='grid lg:grid-cols-2'>
				<div className='bg-white'>
					<CheckoutForm />
				</div>
				<div className='bg-gray-600 h-[100vh]'>
					<CartCheckoutDetails />
				</div>
			</div>
		</>
	)
}

export default CheckoutPage