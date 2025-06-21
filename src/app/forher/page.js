import BannerFH from '@/components/Forhim/BannerFH'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React from 'react'

const ForHer = () => {
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<BannerFH title={"For Her"} desc={"Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style."} />
			</section>
			{/* <section className="relative">
				
				<ProductGridFH />
			</section> */}
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default ForHer