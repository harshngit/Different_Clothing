import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import Orderpage from '@/components/orders/Orderpage'
import React from 'react'

const Orders = () => {
	return (
		<div className="font-playfair">
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				<Orderpage />
			</section>
			<Footer />
		</div>
	)
}

export default Orders