import React from 'react'
import { FaShippingFast, FaCrown, FaBoxOpen, FaMedal } from 'react-icons/fa'

const items = [
	{ icon: FaShippingFast, title: 'Free Shipping', desc: 'Enjoy hassle-free shopping with free shipping on every order, everywhere.' },
	{ icon: FaCrown, title: 'Exclusive Design', desc: 'Crafted with care, our collection offers the highest standards of quality that you can feel.' },
	{ icon: FaBoxOpen, title: 'Good Packaging', desc: 'Your order arrives perfectly packed—because great style deserves great presentation.' },
	{ icon: FaMedal, title: 'Highest Quality', desc: 'Experience the finest materials and craftsmanship in every piece we offer.' },
]

const AboutPerks = () => {
	return (
		<section className="w-full bg-[#e7e7e7] py-10 lg:py-14">
			<div className="max-w-7xl mx-auto px-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#cecece]">
					{items.map(({ icon: Icon, title, desc }, idx) => (
						<div key={idx} className="flex flex-col items-center text-center gap-2 px-6 py-6">
							<div className="w-14 h-14 grid place-items-center rounded-full bg-[#b5b4b3]">
								<div className="w-10 h-10 grid place-items-center rounded-full bg-[#565449] text-white">
									<Icon className="text-[18px]" />
								</div>
							</div>
							<h4 className="mt-2 font-playfair text-lg text-[#2E2A27]">{title}</h4>
							<p className="text-[12px] text-[#5A5754] leading-5 max-w-[220px]">{desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default AboutPerks


