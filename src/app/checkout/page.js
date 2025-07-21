"use client"

import CheckoutPage from '@/components/Checkout/CheckoutPage'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React from 'react'
import { useSelector } from 'react-redux'

const Checkout = () => {


	return (
		<div className="font-playfair">
			{/* <Navbar /> */}
			<section className=''>

			</section>
			<section className="">
				<CheckoutPage />
			</section>

			{/* <Footer /> */}
		</div>
	)
}

export default Checkout