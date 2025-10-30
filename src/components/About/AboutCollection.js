import React from 'react'
import Link from 'next/link'

const defaultItems = [
	{
		id: 'earring',
		title: 'For Him',
		price: 240,
		image: '/asset/Shop/shop1.png',
	},
	{
		id: 'ring',
		title: 'For Her',
		price: 340,
		image: '/asset/Shop/shop2.png',
	},
	// {
	// 	id: 'necklace',
	// 	title: 'Arabic',
	// 	price: 290,
	// 	image: '/asset/Shop/shop3.png',
	// },
];

const AboutCollection = ({ items = defaultItems }) => {
	return (
		<section className="w-full py-10 lg:py-14">
			<div className="max-w-7xl mx-auto px-4">
				<div className="rounded-3xl bg-[#e7e7e7] p-5 lg:p-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
						{/* Left intro */}
						<div className="lg:col-span-4">
							<h3 className="text-3xl lg:text-4xl font-playfair text-[#2E2A27]">Our Collection</h3>
							<p className="mt-3 text-sm lg:text-base text-[#5A5754] leading-6">
							Discover timeless pieces designed to fit every lifestyle. Whether you're looking to elevate your everyday wardrobe or create a standout style, our collection brings together the best of both worlds. With premium materials, versatile designs, and unmatched comfort, we’ve got you covered—no matter your look or mood.
							</p>
							<Link
								href="/shop"
								className="inline-block mt-5 px-5 py-2 rounded-full border border-[#E7DFD7] text-[#2E2A27] text-sm bg-white hover:bg-[#f3efe9] transition"
							>
								See More
							</Link>
						</div>

						{/* Right list */}
						<div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
							{items.map((item) => (
								<div key={item.id} className="group">
									<div className="relative rounded-2xl overflow-hidden bg-white">
										<img src={item.image} alt={item.title} className="w-full h-[170px] lg:h-[190px] object-cover" />
										{/* corner badge */}
										<div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 grid place-items-center text-[#2E2A27] text-xs shadow">★</div>
									</div>
									<h4 className="mt-3 text-base lg:text-lg text-[#2E2A27] font-medium">{item.title}</h4>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutCollection;


